import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstallationController } from './installation.controller';
import { InstallationService } from './installation.service';

@Module({
  imports: [ConfigModule],
  controllers: [InstallationController],
  providers: [InstallationService],
})
export class InstallationModule {}
