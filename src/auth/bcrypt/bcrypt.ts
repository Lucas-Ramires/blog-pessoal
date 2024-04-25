import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export  class Bcrypt{

    async criptografarSenha(senha: string): Promise<string>{

        let saltos: number = 10
        return await bcrypt.hash(senha, saltos);
        //hash criptografa

    }

    async compararSenhas(senhaBanco: string, senhaDigitada: string): Promise<boolean>{
    
        return bcrypt.compareSync(senhaDigitada, senhaBanco);
        //compare compara senha digitada com senha do banco
        
    }
}