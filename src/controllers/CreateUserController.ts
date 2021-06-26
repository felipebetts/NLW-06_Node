import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";


export class CreateUserController {
    // private createUserService: 

    async handle(req: Request, res: Response) {

        const {
            name,
            email,
            password,
            admin
        } = req.body

        const createUserService = new CreateUserService()

        const user = await createUserService.execute({
            name,
            email,
            password,
            admin
        })

        return res.json(user)

    }
}