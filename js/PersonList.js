

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
        return this.tam();
    }
    this.addAt=function (elem,index){
        if(this.isFull()){
            throw new FullListException();
        }
        if(index>size){
            throw "Indice fuera de límite";
        }
        _list.splice(index-1,0,elem); //Cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos.
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
    this.removeElement=function (elem){
        var found=false;
        var i=0;
        while(i<this.size && !found){
            if(_list[i]===elem){
                found=true; //si lo encuentra se lo pasamos a el método remove
                remove(i+1);
            }
            i++;
        }
        return found;
    }
    this.set=function (elem, index){
        var result;
        if(index>this.tam()){
            throw new IndexOutOfBounds();
        }
        return _list.splice(index-1,1,elem);
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
	if (!(elem instanceof Person)) { 
		throw new InvalidValueException ("elem",elem);
	}
	return Lista.prototype.add.call(this, elem); 
} 

PersonList.prototype.toString = function (){
	var str = "";
	if (!this.isEmpty()){ 
		var length = this.size;	
		for (var i=0; i<length;i++){ 
			str = str + this._list[i].fullName() + "\n";
		} 		 		
	} 	
	return str;
} 


PersonList.prototype.indexOf=function(elem){
    if (!(elem instanceof Person)) { 
		throw new InvalidValueException ("elem",elem);
	}
    var resul=-1;
    var i=0;
    while(i<this.tam() && resul===-1){
        if(this.get(i).compare(elem)===0){
            result=i+1;
        }
        i++;
    }
    return resul;
}
function testlist(){	
	
	
    try {
    var personlist= new PersonList;
    console.log ("Capacidad: " + personlist.capacity());
    console.log("Es vacía: " + personlist.isEmpty());
    console.log("Longitud: " + personlist.tam());

    
        
    for (var i=0; i<personlist.capacity(); i++){
        console.log("La lista: " + personlist.add(new Person("Persona nº",""+i*10)));
    }
    
    console.log("Longitud: " + personlist.tam());
    console.log ("The full list: " + personlist.toString());	 	
    console.log ("The first element list: " + personlist.firstElement());
    console.log ("The last element list: " + personlist.lastElement());
    console.log ("The element removed: " + persinlist.remove(list,5));
    console.log("El elemento:" +persinlist.removeElement(list,10));
    console.log(persinlist.set(5,5));	 	
    clear(list);
    console.log(persinlist.addAt(5,2));
    console.log(personlist.indexOf(10));
    
    console.log ("The list: " + personlist.toString());	 	
} catch (err) {
    console.log(err);
}
} 
window.onload = testlist;