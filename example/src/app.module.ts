import { MapRoutesModule } from '@ecomdy/nestjs-map-routes';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MapRoutesModule.register({
      additionalPayload: {
        roles: ['root'],
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
