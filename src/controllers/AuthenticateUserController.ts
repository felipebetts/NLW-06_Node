import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


export class AuthenticateUserController {

    async handle(req: Request, res: Response) {
        const {
            email,
            password
        } = req.body

        const authenticateUserService = new AuthenticateUserService()

        const {
            access_token,
            refresh_token
        } = await authenticateUserService.execute({
            email,
            password
        })

        return res.json({
            access_token,
            refresh_token
        })
    }

    async refreshAccessToken(req: Request, res: Response) {
        const { refresh_token } = req.params

        const authenticateUserService = new AuthenticateUserService()

        const newAccessToken = await authenticateUserService.refreshAccessToken(refresh_token)

        return res.json(newAccessToken)
    }
}