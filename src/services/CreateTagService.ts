import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repositories/TagsRepository";


export class CreateTagService {

    async execute(name: string) {
        const tagsRespository = getCustomRepository(TagsRepository)

        if (!name) {
            throw new Error('Invalid name!')
        }

        const tagAlreadyExists = await tagsRespository.findOne({
            name
        })

        if (tagAlreadyExists) {
            throw new Error('Tag already exists!')
        }

        const tag = tagsRespository.create({
            name
        })

        await tagsRespository.save(tag)

        return tag
    }
}