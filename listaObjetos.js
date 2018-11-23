function Person(name,surname){
    this.name = name;
    this.surname = surname;
}
Person.prototype.constructor = Person;
function Lista (){
    
    var size = 5;
    var _lista= [];
    Object.defineProperty(this, 'MAX_ELEM_LIST', {
		value:size,
		writable:false,
		enumerable:true,
		configurable:false
	});
}
List.prototype = {};
Lista.prototype.constructor = Lista;
function TestPerson(){
    var p1 = new Person ("Pepa","Jimenez");
    var p2 = new Person ("Benito","Perez");
    var p3 = new Person ("Alberto","Guzman");

    var persons= Object.create({},{ Lista:{
        value: [p1,p2,p3]}
    });

    
}