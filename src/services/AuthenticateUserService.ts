import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

interface IAuthRequest {
    email: string
    password: string
}

export class AuthenticateUserService {
    async execute({ email, password }: IAuthRequest) {

        const usersRepository = getCustomRepository(UsersRepository)

        // verificar se existe user com esse email
        const user = await usersRepository.findOne({
            email
        })

        if (!user) {
            throw new Error('Email incorretos')
            // throw new Error('Email e/ou senha incorretos')
        }

        // verificar se a senha está correta
        const passwordsMatch = await compare(password, user.password)

        if (!passwordsMatch) {
            throw new Error('senha incorretos')
            // throw new Error('Email e/ou senha incorretos')
        }

        // se correta, vamos gerar o token
        const token = sign({
            email: user.email
        }, '1cac96bba553f3a43ae8398df3f47118', {
            subject: user.id,
            expiresIn: '1d'
        })

        return token
    }
}