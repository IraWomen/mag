
'use strict';
// Рисую облако заданного размера из трех кругов
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const RADIUS_SMALL = (CLOUD_WIDTH - CLOUD_HEIGHT) / 2;
const RADIUS_BIG = CLOUD_HEIGHT/ 2;



let renderCloud = function(ctx, deltaX = 0, deltaY = 0, color="#ffffff") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(350-deltaX, 150-deltaY, RADIUS_BIG, 0, (Math.PI/180)*360 );
  ctx.arc(350-RADIUS_BIG -deltaX, 150-deltaY, RADIUS_SMALL, 0, (Math.PI/180)*360 );
  ctx.arc(350+RADIUS_BIG -deltaX, 150-deltaY, RADIUS_SMALL, 0, (Math.PI/180)*360 );
  ctx.fill();
  ctx.closePath();
};

let printMessage = function (ctx) {
  ctx.beginPath();
  ctx.fillStyle = "#00F";
  ctx.font = "16px PT Mono";
  ctx.fillText("УРА!", 182, 150 + 8);
  ctx.textAlign = "right"
  ctx.fillText("ПОБЕДА!", 540, 150 + 8);
  ctx.closePath();

  ctx.beginPath();
  ctx.textAlign = "center"
  ctx.fillText("Результаты:", 350, 50);
  ctx.closePath();
}

let drawHistogram = function(ctx,names,times) {

  const DELTA = 50;
  const HEIGHT_HISTOGRAM = 150;
  const MAX = Math.max.apply(null, times);
  for(let i=0; i<times.length; i++) {
    const HEIGHT = Math.round(HEIGHT_HISTOGRAM * times[i] / MAX);
    const START = HEIGHT_HISTOGRAM - HEIGHT;
    ctx.beginPath();
    ctx.font = "12px Arial";
    ctx.fillStyle = "hsl(" + randomColor() + ", 70%, 50%)";
    ctx.rect(255 + i * DELTA, 70 + START, 40, HEIGHT);
    ctx.fill();
    ctx.textAlign = "center"
    ctx.fillStyle = "black";
    ctx.fillText(names[i], 255 + i * DELTA + 40 / 2, 235);
    ctx.closePath();
  }


}
let randomColor = function() {
  const MAX = 360;
  const MIN = 0;
  return Math.floor(Math.random( ) * (MAX - MIN + 1)) + MIN;
}
window.renderStatistics = function(ctx,names,times) {
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  renderCloud(ctx,-5,-10,'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx);
  printMessage(ctx);
  drawHistogram(ctx,names,times)
};

