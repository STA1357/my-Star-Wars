const canvas = document.getElementById('game');
const context = canvas.getContext('2d');


let fon = new Image();
fon.src = './space.jpg';
let asteroid = new Image();
asteroid.src = './asteroid.png';
let ship = new Image();
ship.src = './spaceship.png';
let spaceShip = {x:300, y:300, animx:0, animy:0};
let blaster = new Image();
blaster.src = './759090.png';
let expling = new Image();
expling.src = './NicePng_realistic-fire-png_276260.png';

//Событие
canvas.addEventListener("mousemove", function(event){
    spaceShip.x=event.offsetX-25;
    spaceShip.y=event.offsetY-13;
})
canvas.addEventListener("mousedown", startFire, false);
canvas.addEventListener("mouseup", stopFire, false);

let fireInterval = 0;

function startFire() {
    onFire();
    fireInterval = setInterval(onFire, 300);
}

function stopFire() {
    clearInterval(fireInterval);
}

function onFire(){
    blasterFire.push({x:spaceShip.x+50, y:spaceShip.y-25, dx:0, dy:-5.2});
    blasterFire.push({x:spaceShip.x+50, y:spaceShip.y-25, dx:0.5, dy:-5});
    blasterFire.push({x:spaceShip.x+50, y:spaceShip.y-25, dx:-0.5, dy:-5});
}

//Переменная отвечающая за позицию
let aster = [];
let timer = 0;
let blasterFire = [];
let expl = [];


fon.onload = function(){
    game();
}

//Основной игровой цикл(бесконечнный)
function game(){
    update();
    render();
    requestAnimationFrame(game);
}

//Функция обновления данный(физика, вычесления)
function update(){
    timer++;
    if(timer%60==0){
        aster.push({
            x:Math.random()*600, 
            y:-70, 
            dx:Math.random()*2-1, 
            //что бы они не летели на верх прибавляем 2
            dy:Math.random()*2+2,
            del:0
        });
    }

    for(i in blasterFire){
        blasterFire[i].x=blasterFire[i].x+blasterFire[i].dx;
        blasterFire[i].y=blasterFire[i].y+blasterFire[i].dy;
    
        if(blasterFire[i].y<-30)blasterFire.splice(i,1);
    }

    // onFire();
    //Для создания большого колчиства массивов(астероидов)
    //нужен цикл "for" который будет перебирать массивы
    

    //анимация взрыва
    for(i in expl) {
        expl[i].animx=expl[i].animx+0.3;//+0.5 - скорость анимации
        if(expl[i].animx>7) {
            expl[i].animy++;
            expl[i].animx=0
        }
        if(expl[i].animy>7)
        expl.splice(i,1);
    }
    //Физика
    for(i in aster){
    aster[i].x=aster[i].x+aster[i].dx;
    aster[i].y=aster[i].y+aster[i].dy;

    //Границы
    if(aster[i].x>=540 || aster[i].x<0) aster[i].dx=-aster[i].dx;
    if(aster[i].y>=600) aster.splice(i,1);
    //.splice - удаляет элемент массива

    //проверим каждый астероид на столкновение с каждой пулей;
    for (j in blasterFire){
        if(Math.abs(aster[i].x+35-blasterFire[j].x-15)<50 && Math.abs(aster[i].y+25-blasterFire[j].y-15)<25){
            //помечаем астероид на удаление

            //спавн взрыва
            expl.push({x:aster[i].x-35, y:aster[i].y-25, animx:0, animy:2});

            aster[i].del=1;
            blasterFire.splice(j,1);break;
        }
    }
    //удаляем астероид
    if (aster[i].del==1) aster.splice(i,1);
}

}


//Функция отрисовки
function render(){
    context.drawImage(fon, 0, 0, 600, 600);
    context.drawImage(ship, spaceShip.x, spaceShip.y, 130, 80);
    for(i in aster){
    context.drawImage(asteroid, aster[i].x, aster[i].y, 70, 70);
}
    for(i in blasterFire){
        context.drawImage(blaster, blasterFire[i].x, blasterFire[i].y, 20, 30)
    }

    //рисуем взрыв
    for(i in expl){
        context.drawImage(expling,128*Math.floor(expl[i].animx), 128*Math.floor(expl[i].animy), 128, 128, expl[i].x, expl[i].y, 100, 100);
    }
}

/*let requestAnimationFrame = (function(){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
        window.setTimeout(callback, 1000 / 20);
    }
})();*/