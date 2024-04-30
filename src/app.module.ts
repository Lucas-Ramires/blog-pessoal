import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { Tema } from './tema/entities/tema.entity';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { Postagem } from './postagem/entities/postagem.entity';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      /*useClass: DevService 🡢 O Nest executará a aplicação com a configuração do Banco de dados local (MySQL)
       useClass: ProdService 🡢 O Nest executará a aplicação com a configuração do Banco de dados na nuvem (Render)*/
      imports: [ConfigModule],
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
