
type Person = {
    name: string,
    age: number,
    profession: Profession
}

enum Profession {
    Actress,
    Baker
}


let person1: Person = {
    name: 'maria',
    age: 29,
    profession: Profession.Actress
};

let person2: Person = {
    name: 'roberto',
    age: 19,
    profession: Profession.Baker
};

let person3: Person = {
    name: 'laura',
    age: 32,
    profession: Profession.Actress
};

let person4: Person = {
    name: "carlos",
    age: 19,
    profession: Profession.Baker
}