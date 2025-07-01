import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { User, UserSchema } from './schemas/user.schema';
import { UserMongooseRepository } from './repositories/mongoose/user.mongoose.repository';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [{provide: UserRepository, useClass: UserMongooseRepository}, UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
