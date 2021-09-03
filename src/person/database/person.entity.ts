import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class PersonEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    age: number;
    @Column()
    githubUser: string;
    @Column()
    address: string;
}