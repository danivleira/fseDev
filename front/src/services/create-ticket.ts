import axios from "axios";

const createTicket = async (
  ticketEmail: string,
  ticketSubject: string,
  ticketDescription: string,
  ticketTags: string,
  tokenImage?: any
) => {
  console.log("ticketEmail:", ticketEmail);
  console.log("ticketSubject:", ticketSubject);
  console.log("ticketDescription:", ticketDescription);
  console.log("ticketTags:", ticketTags);
  console.log("tokenImage:", tokenImage);
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
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default createTicket;
