import * as jwt from "jsonwebtoken";

export default function generateToken(data: {
  first_name: string;
  last_name: string;
  id: string;
  email: string;
  reminder: boolean;
}) {
  if (data.reminder === true) {
    const token = jwt.sign(data, String(process.env.JWT), {
      expiresIn: "30d",
    });
    return token;
  }
  const token = jwt.sign(data, String(process.env.JWT), {
    expiresIn: "1d",
  });

  return token;
}
