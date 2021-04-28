'use strict';

//Размер  поля 700*300
//Исходные данные
const WIDTH = 700;
const HEIGHT = 300;
const HEIGHT_HISTOGRAM = 150;
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const COLUMN_WIDTH = 40;

const RADIUS_SMALL = (CLOUD_WIDTH - CLOUD_HEIGHT) / 2;
const RADIUS_BIG = CLOUD_HEIGHT / 2;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const DELTA = 50;
const PADDING = 5;
let players = [];

// Рисую облако заданного размера из трех кругов
let renderCloud = function (ctx, deltaX = 0, deltaY = 0, color = "#ffffff") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(CENTER_X - deltaX, CENTER_Y - deltaY, RADIUS_BIG, 0, (Math.PI / 180) * 360);
  ctx.arc(CENTER_X - RADIUS_BIG - deltaX, CENTER_Y - deltaY, RADIUS_SMALL, 0, (Math.PI / 180) * 360);
  ctx.arc(CENTER_X + RADIUS_BIG - deltaX, CENTER_Y - deltaY, RADIUS_SMALL, 0, (Math.PI / 180) * 360);
  ctx.fill();
  ctx.closePath();
};

let printMessage = function (ctx) {
  ctx.beginPath();
  ctx.fillStyle = "#00F";
  ctx.font = "16px PT Mono";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("УРА!", CENTER_X - CLOUD_WIDTH / 2 + PADDING, CENTER_Y);
  ctx.textAlign = "right";
  ctx.fillText("ПОБЕДА!", CENTER_X + CLOUD_WIDTH / 2 - PADDING, CENTER_Y);
  ctx.closePath();

  ctx.beginPath();
  ctx.textAlign = "center"
  ctx.fillText("Результаты:", CENTER_X, DELTA);
  ctx.closePath();
}

let compare = function(a, b) {
  return a['time'] - b['time'];
}

let drawHistogram = function (ctx, names, times) {
  const MAX = Math.max.apply(null, times);
  //Вычислим ширину гистограммы
  const COUNT = times.length;
  const HISTOGRAM_WIDTH = COLUMN_WIDTH * COUNT + (DELTA - COLUMN_WIDTH) * (COUNT - 1);

  // создадим массив с объектами время + имя и отсортируем его
  for (let i = 0; i < times.length; i++) {
    players[i] = { "name": names[i], "time": times[i]}
  }
  players.sort(compare);

  for (let i = 0; i < players.length; i++){
    const HEIGHT = Math.round(HEIGHT_HISTOGRAM * players[i]['time'] / MAX);
    const DELTA_Y = HEIGHT_HISTOGRAM - HEIGHT;
    const START_Y = CENTER_Y - HEIGHT_HISTOGRAM / 2;
    const START_X = CENTER_X - HISTOGRAM_WIDTH / 2;
    ctx.beginPath();
    ctx.font = "12px Arial";
    ctx.fillStyle = "hsl(" + randomColor() + ", 100%, 70%)";
    ctx.rect(START_X   + i * DELTA,START_Y + DELTA_Y, COLUMN_WIDTH, HEIGHT);
    ctx.fill();
    ctx.textAlign = "center"
    ctx.fillStyle = "black";
    ctx.textBaseline = "top";
    ctx.fillText(players[i]['name'], START_X  + (i * DELTA + COLUMN_WIDTH / 2), START_Y + HEIGHT_HISTOGRAM + PADDING);
    ctx.closePath();
  }


}
let randomColor = function () {
  const MAX = 360;
  const MIN = 0;
  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}
window.renderStatistics = function (ctx, names, times) {
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  renderCloud(ctx, -5, -10, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx);
  printMessage(ctx);
  drawHistogram(ctx, names, times)
};

