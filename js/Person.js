function Person(name,surname){
    this.name = name;
    this.surname = surname;
}
Person.prototype={};
Person.prototype.constructor = Person;

Person.prototype.toString = function personToString(){
	var retorno = "Persona: " + this.name + " " + this.surname + ". ";
	return retorno;
}