import axios from "axios";

const submitForm = async (
  ticketEmail: string,
  ticketSubject: string,
  ticketDescription: string
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
        },
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default submitForm;
