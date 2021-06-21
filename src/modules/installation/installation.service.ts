import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as BigCommerce from 'node-bigcommerce';

console.log('process.env.client_id: ', process.env.client_id);
console.log('process.env.client_id: ', process.env.client_secret);

@Injectable()
export class InstallationService {
  constructor(private config: ConfigService) {}

  async auth(query: any): Promise<boolean> {
    const authResponse = await this.getBigCommerceClient().authorize(query);
    console.debug('auth response: %j', authResponse);
    if (typeof authResponse.access_token !== 'undefined') {
      return true;
    }
    return false;
  }

  async load(query: any): Promise<any> {
    return this.getBigCommerceClient().verify(query['signed_payload']);
  }

  async uninstall(query): Promise<any> {
    return this.getBigCommerceClient().verify(query['signed_payload']);
  }

  getBigCommerceClient() {
    const bigCommerce = new BigCommerce({
      logLevel: 'info',
      clientId: this.config.get<string>('client_id'),
      secret: this.config.get<string>('client_secret'),
      callback: this.config.get<string>('callback_url'),
      responseType: 'json',
      headers: { 'Accept-Encoding': '*' },
      apiVersion: 'v3',
    });
    return bigCommerce;
  }
}
