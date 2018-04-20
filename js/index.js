    'use strict';
// функция для вычисления случайного числа в заданных пределах
let randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }
// блок переменных
  let cm = 39; // 1 см в пикселях (примерно)
  let a = randomInteger(6,9);
  let b = randomInteger(11-a, 14-a);
  
let nums = [a,b];

let spans = document.querySelectorAll('.example span');
let inputs = document.querySelectorAll('input.check');
let curves = document.querySelectorAll('.curve');

let sum = a + b;
let checkSum = document.querySelector('.sum');

let checkA = document.querySelector('.check-a');
let checkB = document.querySelector('.check-b');

let line = document.querySelector('.line');
let startX = line.offsetLeft + 35;
let startY = line.offsetTop;
let spanA = document.querySelector('.a');
let spanB = document.querySelector('.b');

let curve1 = document.querySelector('#curve1');
let curve2 = document.querySelector('#curve2');

// сгенерированные случайные числа вставляем в спаны
spanA.innerHTML = a;
spanB.innerHTML = b;

// собираем все нужные значения в массив объектов

let obj = [
    {num: a, input: checkA, span: spanA, curve: curve1},
    {num: b, input: checkB, span: spanB, curve: curve2},
    {num: sum, input: checkSum},
];

// настраиваем стрелочки
$('#curve1').curvedArrow({
    p0x: startX, // начальный x
    p0y: startY, // начальный y
    p1x: (a/2)*cm+startX, // второй x
    p1y: startY-a*cm/2, // второй y
    p2x: startX+a*cm, // конечный x
    p2y: startY // конечный y
    });
$('#curve2').curvedArrow({
    p0x: startX+a*cm, // начальный x
    p0y: startY, // начальный y
    p1x: a*cm+startX+(b*cm/2), // второй x
    p1y: startY-b*cm/2, // второй y
    p2x: startX+a*cm+b*cm, // конечный x
    p2y: startY // конечный y
    });
// высчитываем длину стрелочки
curve1.style.width = a*cm+'px';
//настраиваем положение инпута
let canvas1 = document.querySelector('#curve1 canvas');
let canvas2 = document.querySelector('#curve2 canvas');
checkA.style.left = (a/2)*cm+startX-(checkA.clientWidth/2)+'px';
checkA.style.top = canvas1.offsetTop-cm+'px';
//при правильном ответе запускаем эту функцию
let correct = (elem)=>{
    elem.input.classList.remove('check-wrong');
    elem.input.classList.add('readonly');
    if (elem.num == a || elem.num == b){
        elem.span.classList.remove('num-wrong');
    }
    elem.input.setAttribute('readonly', true);
    if (elem.input == checkA){
        curve2.classList.remove('hidden');
        checkB.classList.remove('none');
        curve2.style.left = a*cm+startX+'px';
        curve2.style.width = b*cm+'px';
        checkB.style.left = a*cm+startX+(b*cm/2)-(checkB.clientWidth/2)+'px';
        checkB.style.top = canvas2.offsetTop-cm+'px';
    } else if (elem.input == checkB) {
        checkSum.setAttribute('value', '');
        checkSum.removeAttribute('readonly');
        checkSum.classList.remove('readonly');
    }
}
//при неправильном ответе запускаем эту функцию
let unCorrect = (elem)=> {
    elem.input.classList.add('check-wrong');
    if (elem.num == a || elem.num == b) {
        elem.span.classList.add('num-wrong');
    }
}
//проверка является ли введеное значение числом
let isNumberKey = (evt) => {
    return !isNaN(parseFloat(evt)) && isFinite(evt);
}
// генерируем обработчики для всех инпутов
obj.forEach((elem)=>{
    elem.input.addEventListener('input', ()=>{
        if ( isNumberKey(elem.input.value) ){
            elem.input.value == elem.num? correct(elem) : unCorrect(elem);
        } else {
            elem.input.value = '';
        }
        
    })
});