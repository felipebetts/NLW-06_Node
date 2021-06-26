import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";
import { UsersRepository } from "../repositories/UsersRepository";


interface IComplimentRequest {
    tag_id: string
    user_sender: string
    user_receiver: string
    message: string
}

export class CreateComplimentService {

    async execute({
        tag_id,
        user_sender,
        user_receiver,
        message
    }: IComplimentRequest) {

        const complimentsRepository = getCustomRepository(ComplimentsRepository)
        const usersRepository = getCustomRepository(UsersRepository)

        // verificar se existe o receptor do elogio:
        const userReceiverExists = await usersRepository.findOne(user_receiver)

        if(!userReceiverExists) {
            throw new Error('Usuário elogiado não existe!')
        }

        // verificar se o sender é diferente do receiver:
        if (user_sender === user_receiver) {
            throw new Error('Usuário não pode elogiar a si mesmo.')
        }

        // após verificações, criar elogio:
        const compliment = complimentsRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        await complimentsRepository.save(compliment)

        return compliment

    }
}