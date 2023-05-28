import { MapRoutesService } from '@ecomdy/nestjs-map-routes';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';


@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private mapRouteService: MapRoutesService
  ) {}
  async onApplicationBootstrap(): Promise<void> {
    console.log(this.mapRouteService.getRoutesSchema())
  }

  getHello() {
    return this.mapRouteService.getRoutesSchema();
  }
}
