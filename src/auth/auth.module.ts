import { Module } from '@nestjs/common';
import { Bcrypt } from './bcrypt/bcrypt';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [UsuarioModule,
    PassportModule,
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions:{
      expiresIn:'1h'
    }
  })],
  /*a UsuarioModule é pq estamos usando UsuarioServices, PassportModule pq estamos usando 
  a estrategia de passport, o JwtModule puxamos para definir algumas configurações do token,
  a primeira coisa que eu informei foi o lugar onde esta o token que esta na jwtConstants.secret
  e coloquei a propriedade expiresIn que ira indicar quanto tempo o token irá ficar ativo */
 
  providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
  /* foi em providers pq vamos utilizar em outras classes, a AuthService pq é a classe de serviço
  que estamos utilizando para fazer a validação do usuario, e a LocalStrategy é a estrategia do
  passportlocal*/

  controllers: [AuthController],
  exports: [Bcrypt],
  // ta em exports pq vai ser usada em outros recursos
})
export class AuthModule { }