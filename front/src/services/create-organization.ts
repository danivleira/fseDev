import axios from "axios";

export const dynamic = "force-dynamic"; // defaults to auto

const createOrganization = async (organizationName: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/createOrganization`,
      {
        organization: { name: organizationName },
      }
    );
    console.log("cheguei aqui" + response);
  } catch (error) {
    throw error;
  }
};

export default createOrganization;
