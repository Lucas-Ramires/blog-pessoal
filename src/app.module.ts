import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entitites/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './temaa/entities/tema.entity';
import { TemaModule } from './temaa/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';

@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_blogpessoal',
    entities: [Postagem, Tema, Usuario],
    synchronize: true,
    logging: true,
  }),
  PostagemModule, 
  TemaModule,
  AuthModule,
  UsuarioModule   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
