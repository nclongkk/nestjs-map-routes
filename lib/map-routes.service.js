"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapRoutesService = void 0;
const nestjs_discovery_1 = require("@golevelup/nestjs-discovery");
const common_1 = require("@nestjs/common");
const _ = require("lodash");
const constants_1 = require("./constants");
const mark_route_decorator_1 = require("./decorators/mark-route.decorator");
let MapRoutesService = class MapRoutesService {
    constructor(additionalPayload, discover) {
        this.additionalPayload = additionalPayload;
        this.discover = discover;
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            const routeSchema = {};
            const cacheControllerMeta = {};
            const useRoles = yield this.discover.methodsAndControllerMethodsWithMetaAtKey(mark_route_decorator_1.MARK_ROUTE_KEY);
            const methods = yield this.discover.methodsAndControllerMethodsWithMetaAtKey('path');
            for (const item of useRoles) {
                const controllerName = item.discoveredMethod.parentClass.name;
                const methodName = item.discoveredMethod.methodName;
                let pathWithoutControllerFix = item.meta;
                if (pathWithoutControllerFix === 'mark_route_key') {
                    const method = methods.find((i) => i.discoveredMethod.methodName === methodName &&
                        i.discoveredMethod.parentClass.name === controllerName);
                    pathWithoutControllerFix = method.meta !== '/' ? method.meta : '';
                }
                !pathWithoutControllerFix.startsWith('/') &&
                    (pathWithoutControllerFix = `/${pathWithoutControllerFix}`);
                if (!_.has(cacheControllerMeta, `${controllerName}.controllerPath`)) {
                    let controllerMetas = yield this.discover.controllersWithMetaAtKey('path');
                    controllerMetas = controllerMetas.filter(({ discoveredClass }) => {
                        return discoveredClass.name === controllerName;
                    });
                    _.set(cacheControllerMeta, `${controllerName}.controllerPath`, controllerMetas[0].meta);
                }
                const controllerPath = cacheControllerMeta[controllerName].controllerPath;
                if (!_.has(cacheControllerMeta, `${controllerName}.controllerMethod`)) {
                    const controllerMethods = yield this.discover.controllerMethodsWithMetaAtKey('method', (i) => i.name === controllerName);
                    for (const controllerMethod of controllerMethods) {
                        _.set(cacheControllerMeta, `${controllerName}.controllerMethod.${controllerMethod.discoveredMethod.methodName}`, controllerMethod.meta);
                    }
                }
                const apiMethod = common_1.RequestMethod[_.get(cacheControllerMeta, `${controllerName}.controllerMethod.${methodName}`, 0)].toString();
                const apiPath = `${apiMethod}:/${controllerPath}${pathWithoutControllerFix}`.toLowerCase();
                _.set(routeSchema, `${controllerName}.${methodName}.path`, apiPath);
                for (const key in this.additionalPayload) {
                    _.set(routeSchema, `${controllerName}.${methodName}.${key}`, this.additionalPayload[key]);
                }
            }
            this.routesSchema = routeSchema;
        });
    }
    getRoutesSchema() {
        return this.routesSchema;
    }
};
MapRoutesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.INJECT_PAYLOAD_TOKEN)),
    __metadata("design:paramtypes", [Object, nestjs_discovery_1.DiscoveryService])
], MapRoutesService);
exports.MapRoutesService = MapRoutesService;
//# sourceMappingURL=map-routes.service.js.map