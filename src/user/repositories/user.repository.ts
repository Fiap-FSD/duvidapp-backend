import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../schemas/user.schema";

export abstract class UserRepository {
    abstract getAllUsers(): Promise<User[]>;
    abstract getUserById(userId: string): Promise<User>;
    abstract createUser(user: CreateUserDto): Promise<User>;
    abstract updateUser(userId: string, user: UpdateUserDto): Promise<User>;
    abstract deleteUser(userId: string): Promise<void>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract getUsersByRole(role: 'admin' | 'user'): Promise<User[]>;
}