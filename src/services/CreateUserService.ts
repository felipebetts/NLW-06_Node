import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";


interface IUserRequest {
    name: string
    email: string
    password: string
    admin?: boolean
}

export class CreateUserService {

    async execute({ name, email, password, admin = false }: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepository)

        if (!email) {
            throw new Error("Invalid email");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            password: passwordHash,
            admin
        })

        await usersRepository.save(user)

        return user
    }
}