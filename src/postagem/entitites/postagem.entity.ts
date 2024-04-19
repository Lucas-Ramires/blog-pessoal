import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Tema } from "src/temaa/entities/tema.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_postagens"})
export class Postagem{

    @PrimaryGeneratedColumn() //chave primaria e autoincrement
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    //o trim tira os espaços em branco
    //o transformfnparans faz pegar só o texto para aplicar o trim e validar
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn()
    data: Date;

    //
    @ManyToOne(() => Tema, (tema) => tema.postagem,{
        onDelete: "CASCADE"
    })
    tema: Tema; //chave estrangeira
}