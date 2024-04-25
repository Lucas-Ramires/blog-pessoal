import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "src/usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";
import { UsuarioLogin } from "../entities/usuariologin.entity";

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt

    ) { }
    async validateUser(username: string, password: string): Promise<any> {

        const buscaUsuario = await this.usuarioService.findByUsuario(username);
        /*essa const ira executar o metodo da usuarioService chamado FindByUsuario para ver
        se o usuario existe e vai guardar na variavel username que voce acabou de criar no escopo*/

        if (!buscaUsuario)
            throw new HttpException('Usuario não Encontrado', HttpStatus.NOT_FOUND)
        //caso nao exista usuario vai aparecer a msg ^ e vai dar erro NOT FOUND

        const matchPassword = await this.bcrypt.compararSenhas(buscaUsuario.senha, password)
        if (buscaUsuario && matchPassword) {
            const { senha, ...resposta } = buscaUsuario
            /*aqui é uma desestruturação, a variavel resposta vai receber todos os dados de
            buscaUsuario exceto a senha*/
            return resposta
            // ou seja ele vai trazer tudo menos a senha com esse return resposta
        }
        return null
        /*se a senha nao deu match com a que esta salva no banco vai retornar null e vai
        pedir para fzr dnv*/
    }
    async login(usuarioLogin: UsuarioLogin){
        /* esse metodo vai servir para gerar o token e ser a porta de entrada do usuario
        e da senha que o passport precisa*/
        const payload = {
            sub: usuarioLogin.usuario
        }
        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario);

        if (!buscaUsuario)
            throw new HttpException('Usuario não Encontrado', HttpStatus.NOT_FOUND)

        /*se o usuario for encontrado vai retornar tudo que esta abaixo até o token */
        return{
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: buscaUsuario.usuario,
            senha: '',
            foto: buscaUsuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }
}