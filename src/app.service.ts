import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthCheck(): string {
    return 'I am ok, here is your current time: ' + new Date().toLocaleString();
  }
}
