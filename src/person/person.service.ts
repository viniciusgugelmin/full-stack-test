import {Injectable, NotFoundException} from "@nestjs/common";
import {PersonModel} from "./person.model";
import {randomUUID} from "crypto";
import {InjectRepository} from "@nestjs/typeorm";
import {PersonEntity} from "./database/person.entity";
import {Repository, UpdateResult} from "typeorm";

@Injectable()
export class PersonService {
    constructor(
        @InjectRepository(PersonEntity)
        private personRepository: Repository<PersonEntity>
    ) {
    }

    async createPerson(name: string, age: number, githubUser: string, address: string): Promise<PersonEntity> {
        const newPerson = new PersonModel(name, age, githubUser, address);

        return await this.personRepository.save(newPerson);
    }

    updatePerson(personId: string, name: string, age: number, githubUser: string, address: string): Promise<PersonEntity> {
        let person = new PersonEntity();

        if (name) person.name = name;
        if (age) person.age = age;
        if (githubUser) person.githubUser = githubUser;
        if (address) person.address = address;

        this.personRepository.update({id: personId}, person);

        return this.personRepository.findOne(personId);
    }

    async getPeople(): Promise<PersonEntity[]> {
        return await this.personRepository.find();
    }

    getPerson(personId: string): Promise<PersonEntity> {
        const person = this.findPerson(personId);
        return person;
    }

    deletePerson(personId: string): void {
        const person = this.findPerson(personId);
        this.personRepository.delete(personId);
    }

    private findPerson(personId: string): Promise<PersonEntity> {
        const person = this.personRepository.findOne(personId);

        if (!person) {
            throw  new NotFoundException('Could not find person');
        }

        return person;
    }
}