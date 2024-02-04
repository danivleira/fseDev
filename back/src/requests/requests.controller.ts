import { Controller, Post, Body } from '@nestjs/common';
import { RequestsService } from './requests.service';

@Controller('')
export class RequestsController {
  constructor(private readonly requestService: RequestsService) {}
  @Post('/createOrganization')
  async CreateOrganization(@Body() organizationName: string) {
    console.log(organizationName);
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
}
