// data/users.ts
export type User = {
  id: number;
  email: string;
  password: string;
};

let users: User[] = [
  { id: 1, email: "user1@example.com", password: "password123" },
  { id: 2, email: "user2@example.com", password: "password456" },
];

export const getUsers = () => users;

export const addUser = (user: User) => {
  users.push(user);
};

export const findUserByEmail = (email: string) =>
  users.find((user) => user.email === email);
