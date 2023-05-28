import { MarkRoute } from '@ecomdy/nestjs-map-routes';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('a')
@MarkRoute()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/b')
  getHello() {
    return this.appService.getHello();
  }

  @Get('/c')
  getC(): string {
    return 'Hello World!';
  }
}
