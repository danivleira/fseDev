import extractOrganizationName from "@/utils/functions";
import axios, { AxiosError } from "axios";

const createOrganization = async (email: string) => {
  try {
    const organizationName = await extractOrganizationName(email);
    const response = await axios.post(
      `http://localhost:3001/createOrganization`,
      {
        organization: { name: organizationName },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return { status: "OK" };
    } else {
      throw error;
    }
  }
};

export default createOrganization;
