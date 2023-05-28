"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MapRoutesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapRoutesModule = void 0;
const nestjs_discovery_1 = require("@golevelup/nestjs-discovery");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const map_routes_service_1 = require("./map-routes.service");
let MapRoutesModule = MapRoutesModule_1 = class MapRoutesModule {
    static register({ additionalPayload, }) {
        return {
            module: MapRoutesModule_1,
            providers: [
                {
                    provide: constants_1.INJECT_PAYLOAD_TOKEN,
                    useValue: additionalPayload,
                },
                map_routes_service_1.MapRoutesService,
            ],
            exports: [map_routes_service_1.MapRoutesService],
        };
    }
};
MapRoutesModule = MapRoutesModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [nestjs_discovery_1.DiscoveryModule],
    })
], MapRoutesModule);
exports.MapRoutesModule = MapRoutesModule;
//# sourceMappingURL=map-routes.module.js.map