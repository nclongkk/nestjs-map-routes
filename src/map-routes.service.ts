import { DiscoveryService } from '@golevelup/nestjs-discovery';
import {
  Inject,
  Injectable,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import * as _ from 'lodash';
import { INJECT_PAYLOAD_TOKEN } from './constants';
import { MARK_ROUTE_KEY } from './decorators/mark-route.decorator';
import { RoutesSchema } from './types';

@Injectable()
export class MapRoutesService implements OnModuleInit {
  constructor(
    @Inject(INJECT_PAYLOAD_TOKEN)
    private readonly additionalPayload: Record<string, any>,
    private readonly discover: DiscoveryService,
  ) {}
  private routesSchema: RoutesSchema;

  async onModuleInit() {
    const routeSchema = {};
    const cacheControllerMeta = {};
    const useRoles =
      await this.discover.methodsAndControllerMethodsWithMetaAtKey<string>(
        MARK_ROUTE_KEY,
      );
    const methods =
      await this.discover.methodsAndControllerMethodsWithMetaAtKey<string>(
        'path',
      );

    // This map to get api path only for displaying and not being used for checking role, so we could consider removing this one
    for (const item of useRoles) {
      const controllerName = item.discoveredMethod.parentClass.name;
      const methodName = item.discoveredMethod.methodName;
      let pathWithoutControllerFix = item.meta;
      if (pathWithoutControllerFix === 'mark_route_key') {
        const method = methods.find(
          (i) =>
            i.discoveredMethod.methodName === methodName &&
            i.discoveredMethod.parentClass.name === controllerName,
        );
        pathWithoutControllerFix = method.meta !== '/' ? method.meta : '';
      }
      !pathWithoutControllerFix.startsWith('/') &&
        (pathWithoutControllerFix = `/${pathWithoutControllerFix}`);

      if (!_.has(cacheControllerMeta, `${controllerName}.controllerPath`)) {
        let controllerMetas = await this.discover.controllersWithMetaAtKey(
          'path',
        );
        controllerMetas = controllerMetas.filter(({ discoveredClass }) => {
          return discoveredClass.name === controllerName;
        });
        _.set(
          cacheControllerMeta,
          `${controllerName}.controllerPath`,
          controllerMetas[0].meta,
        );
      }
      const controllerPath = cacheControllerMeta[controllerName].controllerPath;

      if (!_.has(cacheControllerMeta, `${controllerName}.controllerMethod`)) {
        const controllerMethods =
          await this.discover.controllerMethodsWithMetaAtKey(
            'method',
            (i) => i.name === controllerName,
          );
        for (const controllerMethod of controllerMethods) {
          _.set(
            cacheControllerMeta,
            `${controllerName}.controllerMethod.${controllerMethod.discoveredMethod.methodName}`,
            controllerMethod.meta,
          );
        }
      }
      const apiMethod =
        RequestMethod[
          _.get(
            cacheControllerMeta,
            `${controllerName}.controllerMethod.${methodName}`,
            0,
          ) as unknown as keyof typeof RequestMethod
        ].toString();

      const apiPath =
        `${apiMethod}:/${controllerPath}${pathWithoutControllerFix}`.toLowerCase();
      _.set(routeSchema, `${controllerName}.${methodName}.path`, apiPath);
      for (const key in this.additionalPayload) {
        _.set(
          routeSchema,
          `${controllerName}.${methodName}.${key}`,
          this.additionalPayload[key],
        );
      }
    }

    this.routesSchema = routeSchema;
  }

  getRoutesSchema(): RoutesSchema<typeof this.additionalPayload> {
    return this.routesSchema;
  }
}
