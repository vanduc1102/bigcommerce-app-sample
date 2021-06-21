import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InstallationService } from './installation.service';

@Controller('/installation')
export class InstallationController {
  constructor(
    private readonly installationService: InstallationService,
    private configService: ConfigService,
  ) {}

  @Get('/auth')
  @Redirect()
  async auth(@Query() authQuery) {
    const isAuthenticated = await this.installationService.auth(authQuery);

    const publicUrl = new URL(this.configService.get('public_url'));
    publicUrl.searchParams.set('isAuthenticated', String(isAuthenticated));

    return {
      url: publicUrl.toString(),
      statusCode: 302,
    };
  }

  @Get('/load')
  @Redirect()
  async load(@Query() query) {
    const verifyResponse = await this.installationService.load(query);
    const isAuthenticated = typeof verifyResponse.user !== 'undefined';
    const publicUrl = new URL(this.configService.get('public_url'));
    publicUrl.searchParams.set('isAuthenticated', String(isAuthenticated));
    return {
      url: publicUrl,
    };
  }

  @Get('/uninstall')
  async uninstall(@Query() query) {
    const verifyResponse = await this.installationService.uninstall(query);
    const isAuthenticated = typeof verifyResponse.user !== 'undefined';
    if (isAuthenticated) {
      console.debug('Remove user at: ', verifyResponse.timestamp);
    }
  }
}
