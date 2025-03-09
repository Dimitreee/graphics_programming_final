var SINGLE_FRAME_WIDTH = 160;
var SINGLE_FRAME_HEIGHT = 120;
var IMAGES_MAP = {};

var canvas_width = 540,
  canvas_height = 700;

function setup() {
  createCanvas(canvas_width, canvas_height);

  window.modules.forEach(function (importedModule, index) {
    IMAGES_MAP[importedModule.name] = null;
    var position = calculateModulePosition(index);

    importedModule.module.exports.setup(position.x, position.y);
  });
}

function draw() {
  window.modules.forEach(function (importedModule, index) {
    var position = calculateModulePosition(index);

    importedModule.module.exports.draw(position.x, position.y);
  });
}

function calculateModulePosition(index) {
  let idx = index;
  if (index >= 2) {
    idx++;
  }

  var positionX = (idx % 3) * 180;
  var positionY = Math.floor(idx / 3) * 140;

  return { x: positionX, y: positionY };
}
