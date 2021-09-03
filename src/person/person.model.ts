export class PersonModel {
    public id: string;

    constructor(
        public name: string,
        public age: number,
        public githubUser: string,
        public address: string
    ) {
    };
}