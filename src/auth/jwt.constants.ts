const JWT_SECRET = process.env['JWT_SECRET'];

// if (!JWT_SECRET) {
//   throw new Error();
// }

export const secret = JWT_SECRET || 'WARNING!!!';
export const saltRounds = 10;
