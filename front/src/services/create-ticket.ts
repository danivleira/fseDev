import axios from "axios";

const createTicket = async (
  ticketEmail: string,
  ticketSubject: string,
  ticketDescription: string,
  ticketTags: string,
  tokenImage?: any
) => {
  try {
    const response = await axios.post(`http://localhost:3001/createTicket`, {
      ticket: {
        requester: {
          email: ticketEmail,
        },
        subject: ticketSubject,
        comment: {
          body: ticketDescription,
          uploads: [`${tokenImage}`],
        },
        tags: ticketTags,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default createTicket;
