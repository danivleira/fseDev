import { Controller, Get, Post, Body } from '@nestjs/common';
import { RequestsService } from './requests.service';

@Controller('')
export class RequestsController {
  constructor(private readonly requestService: RequestsService) {}
  @Post('/createOrganization')
  async CreateOrganization(@Body() organizationName: string) {
    console.log(organizationName);
    return this.requestService.CreateOrganization(organizationName);
  }
}
