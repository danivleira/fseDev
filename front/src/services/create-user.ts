import axios from "axios";

const createUser = async (
  email: string,
  name: string,
  organizationName: string
) => {
  try {
    const response = await axios.post(
      `https://${process.env.subdomain}.zendesk.com/api/v2/tickets.json`,
      {
        user: {
          email: email,
          name: name,
          organization: {
            name: organizationName,
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

export default createUser;
