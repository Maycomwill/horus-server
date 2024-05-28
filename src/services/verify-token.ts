import * as jwt from "jsonwebtoken";
interface JwtPayLoad {
  last_name: string;
  first_name: string;
  email: string;
  id_user: string;
  exp: number;
  iat: number;
}
export default function verifyToken(token: string) {
  const verify = jwt.verify(token, String(process.env.JWT)) as JwtPayLoad;

  return verify;
}
