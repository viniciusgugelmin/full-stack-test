import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PersonModule} from "./person/person.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {GithubModule} from "./github/github.module";
import {PostalCodeModule} from "./cep/postal-code.module";

@Module({
    imports: [
        PostalCodeModule,
        GithubModule,
        PersonModule,
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db',
            entities: [`${__dirname}/**/*.entity{.ts,.js}`],
            synchronize: true
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
