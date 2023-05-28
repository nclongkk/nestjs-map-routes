import { Injectable } from '@nestjs/common';

@Injectable()
export class MapRoutesService {
  getHello(): string {
    return 'Hello World!';
  }
}