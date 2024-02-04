import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RequestsService {
  async CreateOrganization(organizationName: string) {
    console.log(organizationName);
    try {
      const response = await axios.post(
        'https://vtex7459.zendesk.com/api/v2/organizations.json',
        organizationName,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ZGFuaWVsLmxlaXJhQHZ0ZXguY29tOnZ0ZXgxMjM0`,
          },
        },
      );
      console.log('Resposta da API:', response.data);
      return response.data; // ou faça o que precisar com os dados da resposta
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error; // ou trate o erro de acordo com sua lógica de negócios
    }
  }
}
