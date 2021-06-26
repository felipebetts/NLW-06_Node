import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export function ensureAuth(req: Request, res: Response, next: NextFunction) {

    // receber o token
    const authToken = req.headers.authorization

    // verificar se token está preenhido
    if (!authToken) {
        return res.status(401).end()
    }

    const [, access_token] = authToken.split(' ')

    // validar o token em si
    try {
        const { sub } = verify(access_token, '1cac96bba553f3a43ae8398df3f47118') // sub é o user id
        req.user_id = sub as string
        return next()
    } catch (err) {
        console.error(err.expiredAt)
        if (err.expiredAt) {
            return res.status(401).send({
                error: 'Atualize o access_token usando o refresh_token'
            })
        }
        return res.status(401).end()
    }

    // trazer informações do usuário a partir do token

}