import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestsModule } from './requests/requests.module';
import { MulterModule } from '@nestjs/platform-express';
import 'dotenv/config';

@Module({
  imports: [RequestsModule, MulterModule.register({ dest: './uploads' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
