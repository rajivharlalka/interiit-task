import bcrypt from "bcrypt";

const EncryptPass = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const encyprtedPass = bcrypt.hash(password, salt);

  return encyprtedPass;
};

const checkPass = async (encypted: string, password: string) => {
  return bcrypt.compare(password, encypted);
};

export default {EncryptPass, checkPass};
