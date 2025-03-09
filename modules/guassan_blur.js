(function (global) {
  global.registerModule("guassan_blur", function (module) {
    var thresholdSlider;

    function setup(posX, posY) {
      thresholdSlider = global.createSlider(1, 21, 5);

      thresholdSlider.position(
          posX +
          global.SINGLE_FRAME_WIDTH / 2 -
          thresholdSlider.width / 2,
          posY + global.SINGLE_FRAME_HEIGHT - 20,
      );
    }

    function draw(posX, posY) {
      global.fill(0, 0, 255);
      global.rect(posX, posY, 160, 120);

      const in_img = IMAGES_MAP["guassan_blur"];

      if (in_img !== null) {
        image(in_img, posX, posY, in_img.width, in_img.height);
        image(
          global.gaussianBlur(in_img, thresholdSlider.value()),
          posX,
          posY,
          in_img.width,
          in_img.height,
        );
      }
    }

    module.exports = {
      setup: setup,
      draw: draw,
    };
  });
})(window);
