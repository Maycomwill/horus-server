import * as bcrypt from "bcrypt";

export default function compareHash(password: string, hash: string) {
  const compare = bcrypt.compareSync(password, hash);

  return compare;
}
