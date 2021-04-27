
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

let printMessage = function (message) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(350-deltaX, 150-deltaY, RADIUS_BIG, 0, (Math.PI/180)*360 );
  ctx.arc(350-RADIUS_BIG -deltaX, 150-deltaY, RADIUS_SMALL, 0, (Math.PI/180)*360 );
  ctx.arc(350+RADIUS_BIG -deltaX, 150-deltaY, RADIUS_SMALL, 0, (Math.PI/180)*360 );
  ctx.fill();
  ctx.closePath();
}

window.renderStatistics = function(ctx) {
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  renderCloud(ctx,-5,-10,'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx);
};

