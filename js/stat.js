"use strict";

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var TEXT_HEIGHT = 30;
var BAR_WIDTH = 40;
var BAR_INTERVAL = 50;
var barHeight = 150;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  if (arr.length > 0) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  }
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.7)");
  renderCloud(ctx, CLOUD_X, CLOUD_Y, "#ffffff");

  var maxTime = getMaxElement(times);

  this.console.log(times);

  for (var i = 0; i < names.length; i++) {
    var barLength = (barHeight * times[i]) / maxTime;
    ctx.fillStyle =
      names[i] == "Вы"
        ? "rgba(255, 0, 0, 1)"
        : "hsl(240," + Math.random() * 100 + "%, 50%)";
    ctx.fillRect(
      CLOUD_X + GAP + BAR_INTERVAL + (BAR_WIDTH + BAR_INTERVAL) * i,
      CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT - barLength,
      BAR_WIDTH,
      barLength
    );

    ctx.fillStyle = "#000";
    ctx.font = "16px PT Mono";
    ctx.textBaseline = "hanging";

    ctx.fillText("Ура вы победили!", CLOUD_X + FONT_GAP, CLOUD_Y + GAP);
    ctx.fillText(
      "Список результатов:",
      CLOUD_X + FONT_GAP,
      CLOUD_Y + GAP + FONT_GAP
    );

    ctx.fillText(
      names[i],
      CLOUD_X + GAP + BAR_INTERVAL + (BAR_WIDTH + BAR_INTERVAL) * i,
      CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT
    );

    ctx.fillText(
      Math.round(times[i]),
      CLOUD_X + GAP + BAR_INTERVAL + (BAR_WIDTH + BAR_INTERVAL) * i,
      CLOUD_Y + CLOUD_HEIGHT - GAP * 3 - barLength - TEXT_HEIGHT
    );
  }
};
