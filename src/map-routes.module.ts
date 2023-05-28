import { Global, Module } from '@nestjs/common';
import { MapRoutesService } from './map-routes.service';

@Global()
@Module({
  providers: [MapRoutesService],
  exports: [MapRoutesService],
})
export class MapRoutesModule {}