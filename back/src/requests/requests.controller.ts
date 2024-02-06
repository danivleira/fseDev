import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('')
export class RequestsController {
  constructor(private readonly requestService: RequestsService) {}
  @Post('/createOrganization')
  async CreateOrganization(@Body() organizationName: string) {
    return this.requestService.CreateOrganization(organizationName);
  }

  @Post('/createUser')
  async CreateUser(@Body() userInfos: string) {
    return this.requestService.CreateUser(userInfos);
  }

  @Post('/createTicket')
  async CreateTicket(@Body() ticketsInfos: string) {
    return this.requestService.CreateTicket(ticketsInfos);
  }

  @Post('/createImage')
  @UseInterceptors(FileInterceptor('file'))
  async createImage(@UploadedFile() file) {
    return this.requestService.CreateImage(file);
  }
}
