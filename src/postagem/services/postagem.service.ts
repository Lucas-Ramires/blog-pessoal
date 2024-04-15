import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entitites/postagem.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem) 
        private postagemRepository: Repository<Postagem>
    ) { }

    
    async findAll(): Promise<Postagem[]>{
        return await this.postagemRepository.find();
        // isso é equivalente a fazer select * from tb_postagens;
    }
}