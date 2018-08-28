//Сумма через замыкание

/*Напишите функцию sum, которая работает так: sum(a)(b) = a+b.

Да, именно так, через двойные скобки (это не опечатка). Например:

sum(1)(2) = 3
sum(5)(-1) = 4*/

/*Чтобы вторые скобки в вызове работали – первые должны возвращать функцию.
Эта функция должна знать про a и уметь прибавлять a к b.*/

function sum(a) {

    return function(b) {
        return a + b; // возьмет a из внешнего LexicalEnvironment
    }
}

console.log(sum(5)(4));












//Функция - строковый буфер
/*В некоторых языках программирования существует объект «строковый буфер», который аккумулирует внутри себя значения. Его функционал состоит из двух возможностей:

Добавить значение в буфер.
Получить текущее содержимое.
Задача – реализовать строковый буфер на функциях в JavaScript, со следующим синтаксисом:

Создание объекта: var buffer = makeBuffer();.
Вызов makeBuffer должен возвращать такую функцию buffer, которая при вызове buffer(value) добавляет значение в некоторое внутреннее хранилище, а при вызове без аргументов buffer() – возвращает его.
Вот пример работы:

function makeBuffer() { // ваш код  }

var buffer = makeBuffer();

// добавить значения к буферу
buffer('Замыкания');
buffer(' Использовать');
buffer(' Нужно!');

// получить текущее значение
alert( buffer() ); // Замыкания Использовать Нужно!
Буфер должен преобразовывать все данные к строковому типу:

var buffer = makeBuffer();
buffer(0);
buffer(1);
buffer(0);

alert( buffer() ); // '010'*/

function makeBuffer() {
  var text = '';

  return function(piece) {
    if (arguments.length == 0) { // вызов без аргументов
      return text;
    }
    text += piece;
  };
};

var buffer = makeBuffer();

// добавить значения к буферу
buffer('Замыкания');
buffer(' Использовать');
buffer(' Нужно!');

var buffer2 = makeBuffer();
buffer2(0);
buffer2(1);
buffer2(0);

alert( buffer() ); // 'Замыкания Использовать Нужно!'
alert( buffer2() ); // '010'



/*Добавьте буферу из решения задачи Функция - строковый буфер метод buffer.clear(), который будет очищать текущее содержимое буфера:*/
function makeBuffer() {
  var text = '';

  function buffer(piece) {
    if (arguments.length == 0) { // вызов без аргументов
      return text;
    }
    text += piece;
  };

  buffer.clear = function() {
    text = "";
  }

  return buffer;
};

var buffer = makeBuffer();

buffer("Тест");
buffer(" тебя не съест ");
alert( buffer() ); // Тест тебя не съест

buffer.clear();

alert( buffer() ); // ""