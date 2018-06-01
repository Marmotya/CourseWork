'use script'

class setEx {
    constructor() {
        this.arr = {};
        this.size = 0;
    }


    //добавляет элемент в множество
    add(velue) {
        for(var i = 0; i < this.size; i++){
            if(this.arr[i] == velue){
                return;
            }
        }
        this.arr[this.size] = velue;
        this.size ++;
    }

    //очищает множество
    clear() {
        for(var i = this.size - 1; i >= 0; i--){
            delete this.arr[i];
        }
        this.size = 0;
    }

    //удаляет элемент из множества
    Delete(value) {
        if(!this.has(value)){
            console.log("Elem not found");
            return;
        }
        var temp;
        for(var i = 0; i < this.size; i++){
            if(this.arr[i] == value){
                delete this.arr[i];
                temp = i;
                this.size--;
                break;
            }
        }
        if(temp != this.size - 1){
            for(var i = temp; i < this.size; i++){
                this.arr[i] = this.arr[i+1];
            }
            delete this.arr[this.size];
        }
    }

    //возвращает массивы [Ключ, Значение] для каждого элемента
    entries() {
        var entriesArry = [];
        for(var i = 0; i < this.size; i++){
            entriesArry[i] = [i , this.arr[i]];
        }
        return entriesArry;
    }

    //перебор множества
    forEach(callBack) {
        for(var i = 0; i < this.size; i++){
            callBack(this.arr[i], i, this.arr);
        }
    }

    //проверяет, принадлежит ли элемент множеству
    has(value) {
        for (var i = 0; i < this.size; i++){
            if(this.arr[i] == value){
                return true;
            }
        }
        return false;
    }

    //возвращает значения ключей
    keys(){
        var keysArry = [];
        for (var i = 0; i < this.size; i++){
            keysArry[i] = i;
        }
        return keysArry;
    }

    //возвращает элементы множества
    values(){
        var valuesArry = [];
        for (var i = 0; i < this.size; i++){
            valuesArry[i] = this.arr[i];
        }
        return valuesArry;
    }

    //объединение
    union(otherSet){
        var unionSet = new setEx;
        for (var i = 0; i < this.size; i++){
            unionSet.add(this.arr[i]);
        }
        for (var i = 0; i < otherSet.size; i++){
            unionSet.add(otherSet.arr[i]);
        }
        return unionSet;
    }

    //пересечение
    intersecrion(otherSet){
        var intersecrionSet = new setEx;
        for (var i = 0; i < this.size; i++){
            for (var j = 0; j < otherSet.size; j++){
                if (this.arr[i] == otherSet.arr[j]){
                    intersecrionSet.add(this.arr[i]);
                }
            }
        }
        return intersecrionSet;
    }

    //симметрическая разность
    difference(otherSet){
        var differenceSet = new setEx;
        top: for(var i = 0; i < this.size; i++){
            for(var j = 0; j < this.intersecrion(otherSet).size; j++){
                if (this.arr[i] == this.intersecrion(otherSet).arr[j]){
                    continue top;
                }
            }
            differenceSet.add(this.arr[i]);
        }
        top: for(var i = 0; i < otherSet.size; i++){
            for(var j = 0; j < this.intersecrion(otherSet).size; j++){
                if (otherSet.arr[i] == this.intersecrion(otherSet).arr[j]){
                    continue top;
                }
            }
            differenceSet.add(otherSet.arr[i]);
        }
        return differenceSet;
    }

    //разность
    complement(otherSet){
        var complementSet = new setEx;
        top: for(var i = 0; i < this.size; i++){
            for(var j = 0; j < this.intersecrion(otherSet).size; j++){
                if (this.arr[i] == this.intersecrion(otherSet).arr[j]){
                    continue top;
                }
            }
            complementSet.add(this.arr[i]);
        }
        return complementSet;
    }
}

var mySet = new setEx;                                                            
mySet.add('Black Panther');
mySet.add('The Stolen Princess');
mySet.add('Ready Player One');
mySet.add('Ready Player One');
mySet.add('Tomb Raider');

console.log('Test forEach(): ');                                                    
function callBack(value, index, arry){
    console.log('Index: ' + index);
    console.log('Data: ' + value);
}
mySet.forEach(callBack);

mySet.add('Rampage');                               
mySet.add('A Quiet Place');
mySet.add('Truth or Dare');
mySet.add('Pacific Rim: Uprising');
console.log('First set:');
console.dir(mySet.values());                                                      

console.log('Test delete(): ')
mySet.Delete('Rampage');                                                          
mySet.Delete('Meg');
console.dir(mySet.values());

console.log('Test has(): ')
console.dir(mySet.has('Truth or Dare'));                                          
console.dir(mySet.has('Rampage'));

console.log('Test entries(): ')
console.dir(mySet.entries());                                                    

console.log('Second set:')
var newSet = new setEx;
newSet.add('Solo: A Star Wars Story');
newSet.add('Truth or Dare');
newSet.add('Ready Player One');
newSet.add('Terminal');
newSet.add('Black Panther');
newSet.add('Annihilation');
newSet.add('Bad Samaritan');
console.dir(newSet.values());

console.log('Union: ')                                   
var unionSt = new setEx;
unionSt = mySet.union(newSet);
console.dir(unionSt.values());

console.log('Intersecrion: ')
var intrscrion = new setEx;
intrscrion = mySet.intersecrion(newSet);
console.dir(intrscrion.values());

console.log('Difference:');
var diffrnce = new setEx;
diffrnce = mySet.difference(newSet)
console.dir(diffrnce.values());

console.log('Complement:');
var complmnt = new setEx;
complmnt = mySet.complement(newSet);
console.dir(complmnt.values());


mySet.clear();
console.dir(mySet.arr);
delete mySet;
newSet.clear();
delete newSet;
unionSt.clear();
delete unionSt;
intrscrion.clear();
delete intrscrion;
diffrnce.clear();
delete diffrnce;
complmnt.clear();
delete complmnt;




