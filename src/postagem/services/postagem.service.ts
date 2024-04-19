import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entitites/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "src/temaa/entities/tema.entity";
import { TemaService } from "src/temaa/services/tema.service";


@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        private TemaService: TemaService
        /* pedimos pra criar uma instancia de repository passando como parametro 
        a postagem ele vai fazer o crud do objeto postagem da tabela postagem */
    ) { }


    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            relations:{
                tema: true
            }
        });
        // isso é equivalente a fazer select * from tb_postagens;
        // promise promete que vai trazer um array com muitas coisas ou void
        // o await precisa ser utilizado pq a função é assincrona 
        // a função assincrona faz processamento paralelo

    }

    async findById(id: number): Promise<Postagem> {

        let postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations: {
                 tema: true
            }
        });
        // checa se a postagem nao foi encontrada
        if (!postagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
        //retorna a postagem caso ela exista
        return postagem;

        // equivalente so select *from tb_postagens WHERE id = ?;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
                //o ILike ignora se é maiusculo ou minusculo e vai trazer do msm jeito
            },
            relations: {
                tema: true
           }
        })
    }
    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
        // serve como insert into na tabela
    }
    async update(postagem: Postagem): Promise<Postagem> {

        let buscaPostagem: Postagem = await this.findById(postagem.id)
        if (!buscaPostagem || !postagem.id)
            throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)
        return await this.postagemRepository.save(postagem);
        //updade tb_postagens set titulo = ?, texto = ?, data = servir where id = ?;
    }
    async delete(id: number): Promise<DeleteResult> {
        let buscaPostagem: Postagem = await this.findById(id);
        if (!buscaPostagem)
            throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)
        return await this.postagemRepository.delete(id);
    }
}