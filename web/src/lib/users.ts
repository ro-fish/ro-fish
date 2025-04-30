import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const usersPath = path.join(process.cwd(), "src/lib/users.json");

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export async function createUser(userData: Omit<User, "id">) {
  const users = await getUsers();
  const existingUser = users.find((user) => user.email === userData.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser: User = {
    id: uuidv4(),
    ...userData,
    password: hashedPassword,
  };

  users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  return newUser;
}

export async function verifyUser(email: string, password: string) {
  const users = await getUsers();
  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid password");
  }

  return user;
}

async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(usersPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
