import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/schemas/user.schema";
import { UserRepository } from "../user.repository";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";

export class UserMongooseRepository implements UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ){}

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getUsersByRole(role: 'admin' | 'user'): Promise<User[]> {
        return this.userModel.find({ role }).exec();
    }

    async getUserById(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
    }

    async createUser(user: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async updateUser(userId: string, user: UpdateUserDto): Promise<User>{
        const result = await this.userModel.findByIdAndUpdate(userId, user, { new: true }).exec();
        return result;
    }

    async deleteUser(userId: string): Promise<void> {
        await this.userModel.deleteOne({_id: userId}).exec();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }
}