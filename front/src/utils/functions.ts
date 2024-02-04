const extractOrganizationName = async (email: string) => {
  const atIndex = email.indexOf("@");
  const dotComIndex = email.indexOf(".com", atIndex);

  if (atIndex !== -1 && dotComIndex !== -1) {
    return email.substring(atIndex + 1, dotComIndex);
  }

  return null;
};

export default extractOrganizationName;
