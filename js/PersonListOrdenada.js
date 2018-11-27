//Excepciones de Lista Generales

function MyListException() {
	this.name = "MyListException";
	this.message = "Error: Excepción de Lista.";
}
MyListException.prototype = new Error(); 
MyListException.prototype.constructor = MyListException;

function EmptyListException() {
	this.name = "EmptyListException";
	this.message = "Error: La lista está vacia.";
}
EmptyListException.prototype = new MyListException();
EmptyListException.prototype.constructor = EmptyListException;

function FullListException() {
	this.name = "FullListException";
	this.message = "Error: La lista está llena.";
}
FullListException.prototype = new MyListException(); 
FullListException.prototype.constructor = FullListException;

function IndexOutOfBounds(){
	this.name ="IndexOutOfBounds";
	this.message="Error: El indice no se ha encontrado.";
}
IndexOutOfBounds.prototype = new MyListException();
IndexOutOfBounds.prototype.constructor= IndexOutOfBounds;

function Lista (size = 5){
    
    if (!(this instanceof Lista)) 
    throw new InvalidAccessConstructorException();
    size = typeof size !== 'undefined' ? size : 5;

    var _list = [];
    //Constante nº máximo de elementos en el array
    Object.defineProperty(this, 'MAX_ELEM_LIST', {
        value:size,
        writable:false,
        enumerable:true,
        configurable:false
    });

    this.isEmpty = function(){
        return (_list.length === 0); //Devuelve true si está vacia
    } 
    
    this.isFull = function (){
        return (_list.length === this.size); //Devuelve true si la lista esta llena
    }
    this.tam = function (){ //Pongo Tam (tamaño) porque no me deja poner size
        return _list.length; //Tamaño de la lista
    }
    this.add = function (elem){
        if(this.isFull()){
            throw new FullListException();
        }
        _list.push(elem); //push pone el elemento en el último lugar que este libre
        _list.sort(); //Lo ordeno
        return this.tam();
    }
    function get(index){
        index= parseInt(index);
        if(index>this.tam){
            throw new IndexOutOfBounds();
        }
        return _list[index-1]; //-1 porque el usuario me pasa 1-5
    }
    this.toString = function (){
        var str = "";
        if (this.tam()===0){
           //throw new EmptyListException();  		
        } 		
        for (var i=0; i<_list.length;i++){
            str = str + _list[i] + " - ";
        } 		 		
        str = str + _list[i]; 

        return str;
    }
    this.indexOf=function (elem){
        return _list.indexOf(elem)+1; //El método busca en el array el elemento especificado y devuelve su posición.
        //Si no lo encuentra devuelve un -1
    }
    
    this.lastIndexOf=function (elem){
        return _list.lastIndexOf(elem)+1; //El método lastIndexOf busca en el array el elemento especificado y devuelve su posición.
        //Si no lo encuentra devuelve un -1
    }
    this.capacity=function(){
        return size;
    } 
    
    this.clear = function(){
        if (this.isEmpty()){
            throw new EmptyListException();
        } 	
        _list.splice(0, _list.length); //El método splice agrega / elimina elementos a / desde una matriz 
        //y devuelve los elementos eliminados.
    }
    this.firstElement=function (){
        var first;
        if (!this.isEmpty()){
            first= _list.shift(); //Devuelve el primer elemento y lo saca.
            _list.unshift(first); //Vuelvo a meter el elmento en el primer lugar.		
        } else {
            throw new EmptyListException();
        }
        return first;
    } 
    
    this.lastElement=function (){
        var last;
        if (!this.isEmpty()){
            last=_list.pop(); //Extrae el último elemento de la lista y lo devuelve.
            _list.push(last); //Inserta el elemento al final de la lista			
        } else {
            throw new EmptyListException();
        }
        return last;
    } 
    this.remove=function (index){
        index = parseInt(index);
        if(index>this.tam()){
            throw new IndexOutOfBounds();
        }
        return _list.splice(index-1, 1);
    }
}
Lista.prototype = {};
Lista.prototype.constructor = Lista;

function PersonList(size = 5){
	if (!(this instanceof PersonList)) 
		throw new InvalidAccessConstructorException();
	size = typeof size !== 'undefined' ? size : 5;

	
	Lista.call(this,size);
}
PersonList.prototype = Object.create(Lista.prototype);  
PersonList.prototype.constructor = PersonList;

PersonList.prototype.add = function (elem){
    if(!(elem instanceof Person)){
        throw new InvalidValueException(elem);
    }
    if (this.isFull()){
        throw new FullListException();
    }
    if(this.isEmpty()){
        _list[0]=elem;
        return _list.length;
    }
    var i=0;
    var found=false;
    while(i<=_list.length-1 && !found){
        if((list[i].surname.localeCompare(elem.surname)) != -1){
            if((list[i].surname.localeCompare(elem.surname)) == 0){
                if((list[i].name.localeCompare(elem.name)) != -1){
                    found=true;
                }else{
                    i++;
                }
            }
            else if((list[i].surname.localeCompare(elem.surname)) == 1){
                found=true;
            }
        }else{
            i++;
        }
    }
    _list.splice(i, 0, elem);
    return _list.length;
	 
} 

PersonList.prototype.toString = function (){
	var str = "";
    if (!this.isEmpty()){
        for (var i=0; i<list.length-1;i++){
            str = str + list[i] + " - ";
        } 		 		
        str = str + list[i]; 		
    } 	
    return str;
} 

PersonList.prototype.indexOf=function(elemt){
    if(!(elem instanceof Person)){
        throw new InvalidValueException(elem);
    }
    var position = -1;
        if (!this.isEmpty()){
            position = list.findIndex(i => (i.name === elem.name && i.surname === elem.surname));		 		
        } 	
     else{
        throw new EmptyListException();
    }
    return position;
}
PersonList.prototype.removePerson = function(elem){
    if(!(elem instanceof Person)){
        throw new InvalidValueException(elem);
    }
    var elem;
    if (this.isEmpty()){
        throw new EmptyListException();
    }
    else {
        var position = -1;
        position = this.indexOf(elem);
        if(position !== -1){
            this.remove(position);
        }
    }
    return position;
}
function testlist(){	
    var personlist = new PersonList;
    
    console.log ("Capacidad: " + personlist.capacity());
    console.log("Es vacía: " + personlist.isEmpty());
    console.log("Longitud: " + personlist.tam());

        
    try {
        for (var i=0; i<personlist.capacity(); i++){
            console.log("Nº de elementos: " + personlist.add(new Person("Persona nº",""+i*10)));
        }
    } catch (err) {
        console.log(err);
    }
    
    console.log("Longitud: " + personlist.tam());
    console.log ("The full list: " + personlist.toString());	 	
    console.log ("The first element list: " + personlist.firstElement());
    console.log ("The last element list: " + personlist.lastElement());
    /*console.log ("The element removed: " + personlist.remove(personlist,5));
    console.log("El elemento:" +personlist.removeElement(personlist,10));
    console.log(personlist.set(5,5));	 	
    clear(personlist);*/
    
    console.log ("The list: " + personlist.toString());	 	

} 
window.onload = testlist;