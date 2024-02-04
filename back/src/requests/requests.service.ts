import { Injectable } from '@nestjs/common';
import axios from 'axios';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ZGFuaWVsLmxlaXJhQHZ0ZXguY29tOnZ0ZXgxMjM0`,
  },
};

@Injectable()
export class RequestsService {
  async CreateOrganization(organizationName: string) {
    console.log(organizationName);
    try {
      const response = await axios.post(
        'https://vtex7459.zendesk.com/api/v2/organizations.json',
        organizationName,
        headers,
      );
      console.log('Resposta da API:', response.data);
      return response.data;
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        return { status: 'OK' };
      } else {
        throw error;
      }
    }
  }

  async CreateUser(userInfos: string) {
    try {
      const response = await axios.post(
        'https://vtex7459.zendesk.com/api/v2/users',
        userInfos,
        headers,
      );
      console.log('resposta users :' + response.data);
      return response.data;
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        console.log('User já existe. Tratando como sucesso.');
        return { status: 'OK' };
      } else {
        throw error;
      }
    }
  }

  async CreateTicket(ticketInfos: string) {
    try {
      const response = await axios.post(
        'https://vtex7459.zendesk.com/api/v2/tickets',
        ticketInfos,
        headers,
      );
      console.log('resposta tickets :' + response.data);
      return response.data;
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        console.log('Ticket já existe. Tratando como sucesso.');
        return { status: 'OK' };
      } else {
        throw error;
      }
    }
  }
}
