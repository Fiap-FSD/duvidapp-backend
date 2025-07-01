import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async createUser(createUserDto: CreateUserDto) {
        const { email, name, password, role } = createUserDto;

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('Este email já está em uso!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.userRepository.createUser({
            email,
            name,
            password: hashedPassword,
            role,
        });
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
    
        const updateData = { ...updateUserDto };
    
        // Verificação da troca de senha
        if (updateUserDto.password) {
            if (!updateUserDto.currentPassword) {
                throw new UnauthorizedException('Senha atual é obrigatória para atualizar a senha.');
            }
    
            const passwordMatches = await bcrypt.compare(updateUserDto.currentPassword, user.password);
            if (!passwordMatches) {
                throw new UnauthorizedException('Senha atual incorreta.');
            }
    
            updateData.password = await bcrypt.hash(updateUserDto.password, 10);
        }
    
        delete updateData.currentPassword; // não persistir no banco
    
        return this.userRepository.updateUser(userId, updateData);
    }
    

    async findByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }

    async getAllUsers(role?: 'admin' | 'user') {
        if (role) {
            return this.userRepository.getUsersByRole(role);
        }
        return this.userRepository.getAllUsers();
    }


    async getUserById(userId: string) {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        return user;
    }

    async deleteUser(userId: string){
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        await this.userRepository.deleteUser(userId);
    }
}
