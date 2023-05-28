import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { INJECT_PAYLOAD_TOKEN } from './constants';
import { MapRoutesService } from './map-routes.service';

@Global()
@Module({
  imports: [DiscoveryModule],
})
export class MapRoutesModule {
  static register({
    additionalPayload,
  }: {
    additionalPayload: Record<string, any>;
  }): DynamicModule {
    return {
      module: MapRoutesModule,
      providers: [
        {
          provide: INJECT_PAYLOAD_TOKEN,
          useValue: additionalPayload,
        },
        MapRoutesService,
      ],
      exports: [MapRoutesService],
    };
  }
}
