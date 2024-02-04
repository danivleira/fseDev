import axios from "axios";

const submitForm = async (organizationId: number) => {
  try {
    const response = await axios.post(
      `https://${process.env.subdomain}.zendesk.com/api/v2/tickets.json`,
      {
        ticket: {
          requester: {
            name: "usuario 42",
            email: "agencia@garage.com",
          },
          organization_id: organizationId,
          subject: "dúvidas como criar loja",
          comment: {
            body: "não consigo sozinhosss",
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic ZGFuaWVsLmxlaXJhQHZ0ZXguY29tOnZ0ZXgxMjM0",
        },
      }
    );

    console.log("Ticket criado:", response.data);

    return response.data;
  } catch (error) {
    console.error("Erro ao criar ticket:", error);
    throw error;
  }
};

export default submitForm;
