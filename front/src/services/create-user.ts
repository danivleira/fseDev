import extractOrganizationName from "@/utils/functions";
import axios from "axios";

const createUser = async (email: string, name: string) => {
  try {
    const organizationName = await extractOrganizationName(email);
    const response = await axios.post(`http://localhost:3001/createUser`, {
      user: {
        email: email,
        name: name,
        organization: {
          name: organizationName,
        },
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default createUser;
