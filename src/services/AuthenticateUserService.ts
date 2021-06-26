import { compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
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

        // se correta, vamos gerar os tokens
        const access_token = sign({
            email: user.email
        }, '1cac96bba553f3a43ae8398df3f47118', {
            subject: user.id,
            expiresIn: '1h'
        })

        const refresh_token = sign({
            email: user.email
        }, '14ac4e7305a501abbfeaa45bd36d9690', {
            subject: user.id,
            expiresIn: '1d'
        })

        return {
            access_token,
            refresh_token
        }
    }

    async refreshAccessToken (refresh_token: string) {

        const { sub } = verify(refresh_token, '14ac4e7305a501abbfeaa45bd36d9690')
        
        if(!sub) {
            throw new Error('invalid refresh_token')
        }

        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findOne(sub as string)

        if (!user) {
            throw new Error('usuário não existe')
        }

        const access_token = sign({
            email: user.email
        }, '1cac96bba553f3a43ae8398df3f47118', {
            subject: user.id,
            expiresIn: '1h'
        })

        return {
            access_token,
            refresh_token
        }

    }
}