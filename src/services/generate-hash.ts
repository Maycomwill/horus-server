import * as bcrypt from "bcrypt";

export default function generateHash(password: string) {
  const salt = 10;
  const encryptedPassword = bcrypt.hashSync(password, salt);
  return encryptedPassword;
}
