import { messages } from "../constants"

export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return messages.insertEmail;
  if (!re.test(email)) return messages.invalidEmail;

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return messages.insertPassword;

  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return messages.insertName;

  return '';
};
