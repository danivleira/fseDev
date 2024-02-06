import { Injectable } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

const email = process.env.email;
const password = process.env.password;

const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString(
      'base64',
    )}`,
  },
};

@Injectable()
export class RequestsService {
  async CreateOrganization(organizationName: string) {
    try {
      const response = await axios.post(
        'https://vtex7459.zendesk.com/api/v2/organizations.json',
        organizationName,
        headers,
      );

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

  async CreateTicket(ticketInfos: string) {
    try {
      const response = await axios.post(
        'https://vtex7459.zendesk.com/api/v2/tickets',
        ticketInfos,
        headers,
      );
      return response.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  async CreateImage(file: Express.Multer.File) {
    if (!file) {
      return;
    }
    try {
      const zendeskResponse = await axios.post(
        'https://vtex7459.zendesk.com/api/v2/uploads.json?filename=v.png',
        file,
        {
          headers: {
            'Content-Type': 'image/png',
            Authorization: `Basic ${Buffer.from(
              `${email}:${password}`,
            ).toString('base64')}`,
          },
        },
      );
      return zendeskResponse.data.upload.token;
    } catch (error) {
      throw error;
    }
  }
}
