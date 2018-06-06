'use strict';

class SetEx {
  constructor() {
    this.arr = {};
    this.size = 0;
  }

  //добавляет элемент в множество
  add(velue) {
    for (let i = 0; i < this.size; i++) {
      if (this.arr[i] === velue) {
        return false;
      }
    }
    this.arr[this.size] = velue;
    this.size++;
    return true;
  }

  //очищает множество
  clear() {
    for (let i = this.size - 1; i >= 0; i--) {
      delete this.arr[i];
    }
    this.size = 0;
    return true;
  }

  //удаляет элемент из множества
  Delete(value) {
    if (!this.has(value)) {
      console.log('Elem not found');
      return false;
    }
    let temp;
    for (let i = 0; i < this.size; i++) {
      if (this.arr[i] === value) {
        delete this.arr[i];
        temp = i;
        this.size--;
        break;
      }
    }
    if (temp !== this.size - 1) {
      for (let j = temp; j < this.size; j++) {
        this.arr[j] = this.arr[j + 1];
      }
      delete this.arr[this.size];
    }
    return true;
  }

  //возвращает массивы [Ключ, Значение] для каждого элемента
  entries() {
    const entriesArry = [];
    for (let i = 0; i < this.size; i++) {
      entriesArry[i] = [i, this.arr[i]];
    }
    return entriesArry;
  }

  //перебор множества
  forEach(callBack) {
    for (let i = 0; i < this.size; i++) {
      callBack(this.arr[i], i, this.arr);
    }
  }

  //проверяет, принадлежит ли элемент множеству
  has(value) {
    for (let i = 0; i < this.size; i++) {
      if (this.arr[i] === value) {
        return true;
      }
    }
    return false;
  }

  //возвращает элементы множества
  values() {
    const valuesArry = [];
    for (let i = 0; i < this.size; i++) {
      valuesArry[i] = this.arr[i];
    }
    return valuesArry;
  }

  /*возвращает значения ключей
  (но set.keys возвращает то же самое, что и set.values)*/
  keys() {
    return this.values();
  }

  //объединение
  union(otherSet) {
    const unionSet = new SetEx();
    for (let i = 0; i < this.size; i++) {
      unionSet.add(this.arr[i]);
    }
    for (let i = 0; i < otherSet.size; i++) {
      unionSet.add(otherSet.arr[i]);
    }
    return unionSet;
  }

  //пересечение
  intersecrion(otherSet) {
    const intersecrionSet = new SetEx();
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < otherSet.size; j++) {
        if (this.arr[i] === otherSet.arr[j]) {
          intersecrionSet.add(this.arr[i]);
        }
      }
    }
    return intersecrionSet;
  }

  //симметрическая разность
  difference(otherSet) {
    const differenceSet = new SetEx();
    top: for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.intersecrion(otherSet).size; j++) {
        if (this.arr[i] === this.intersecrion(otherSet).arr[j]) {
          continue top;
        }
      }
      differenceSet.add(this.arr[i]);
    }
    top: for (let i = 0; i < otherSet.size; i++) {
      for (let j = 0; j < this.intersecrion(otherSet).size; j++) {
        if (otherSet.arr[i] === this.intersecrion(otherSet).arr[j]) {
          continue top;
        }
      }
      differenceSet.add(otherSet.arr[i]);
    }
    return differenceSet;
  }

  //разность
  complement(otherSet) {
    const complementSet = new SetEx();
    top: for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.intersecrion(otherSet).size; j++) {
        if (this.arr[i] === this.intersecrion(otherSet).arr[j]) {
          continue top;
        }
      }
      complementSet.add(this.arr[i]);
    }
    return complementSet;
  }
}

const mySet = new SetEx();
mySet.add('Black Panther');
mySet.add('The Stolen Princess');
mySet.add('Ready Player One');
mySet.add('Ready Player One');
mySet.add('Tomb Raider');

console.log('Test forEach(): ');
function callBack(value, index) {
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

console.log('Test delete(): ');
mySet.Delete('Rampage');
mySet.Delete('Meg');
console.dir(mySet.values());

console.log('Test has(): ');
console.dir(mySet.has('Truth or Dare'));
console.dir(mySet.has('Rampage'));

console.log('Test entries(): ');
console.dir(mySet.entries());

console.log('Second set:');
const newSet = new SetEx();
newSet.add('Solo: A Star Wars Story');
newSet.add('Truth or Dare');
newSet.add('Ready Player One');
newSet.add('Terminal');
newSet.add('Black Panther');
newSet.add('Annihilation');
newSet.add('Bad Samaritan');
console.dir(newSet.values());

console.log('Union: ');
let unionSt = new SetEx();
unionSt = mySet.union(newSet);
console.dir(unionSt.values());

console.log('Intersecrion: ');
let intrscrion = new SetEx();
intrscrion = mySet.intersecrion(newSet);
console.dir(intrscrion.values());

console.log('Difference:');
let diffrnce = new SetEx();
diffrnce = mySet.difference(newSet);
console.dir(diffrnce.values());

console.log('Complement:');
let complmnt = new SetEx();
complmnt = mySet.complement(newSet);
console.dir(complmnt.values());


mySet.clear();
console.dir(mySet.arr);
newSet.clear();
unionSt.clear();
intrscrion.clear();
diffrnce.clear();
complmnt.clear();
