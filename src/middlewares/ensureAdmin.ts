import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../repositories/UsersRepository";
import { getCustomRepository } from "typeorm";


// middleware de autenticação
export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    // verificar se usuário é admin

    const { user_id } = req

    const usersRepository = getCustomRepository(UsersRepository)
    
    const { admin } =  await usersRepository.findOne(user_id)

    if (admin) {
        return next()
    }

    // status 401 = Unauthorized
    return res.status(401).json({
        error: "User is not authorized to perform this action"
    })
}