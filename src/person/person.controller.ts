import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from "@nestjs/common";
import {PersonService} from "./person.service";
import {ErrorResponse, OkResponse} from "@roit/roit-response-handler/dist";
import {PersonModel} from "./person.model";
import {PersonEntity} from "./database/person.entity";
import {ResponseModel} from "@roit/roit-response-handler/dist/ResponseModel";

@Controller('person')
export class PersonController {
    constructor(private readonly personService: PersonService) {
    }

    @Post()
    async create(
        @Body('name') personName: string,
        @Body('age') personAge: number,
        @Body('githubUser') personGithubUser: string,
        @Body('address') personAddress: string
    ) {
        try {
            const person = await this.personService.createPerson(personName, personAge, personGithubUser, personAddress);

            return OkResponse(person);
        } catch (e) {
            return ErrorResponse('An error occurred while trying to create the user', e)
        }
    }

    @Patch(':id')
    update(
        @Param('id') personId: string,
        @Body('name') personName: string,
        @Body('age') personAge: number,
        @Body('githubUser') personGithubUser: string,
        @Body('address') personAddress: string
    ) {
        return this.personService.updatePerson(personId, personName, personAge, personGithubUser, personAddress);
    }

    @Get('')
    get(): Promise<PersonEntity[]> {
        return this.personService.getPeople();
    }

    @Get(':id')
    getById(@Param('id') personId: string): Promise<PersonEntity> | ResponseModel {
        try {
            return this.personService.getPerson(personId);
        } catch (e) {
            return ErrorResponse('An error occurred while trying to get the user', e)
        }
    }

    @Delete(':id')
    remove(@Param('id') personId: string) {
        try {
            this.personService.deletePerson(personId);
            return OkResponse({});
        } catch (e) {
            return ErrorResponse('An error occurred while trying to delete the user', e)
        }
    }
}