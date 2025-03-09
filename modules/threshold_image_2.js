(function (global) {
  global.registerModule("threshold_image_2", function (module) {
    var thresholdSlider;

    const setup = (posX, posY) => {
      thresholdSlider = global.createSlider(0, 100, 20);

      thresholdSlider.position(
        posX + global.SINGLE_FRAME_WIDTH / 2 - thresholdSlider.width / 2,
        posY + global.SINGLE_FRAME_HEIGHT - 20,
      );
    };

    const draw = (posX, posY) => {
      global.fill(0, 0, 255);
      global.rect(posX, posY, 160, 120);

      const in_img = IMAGES_MAP["threshold_image_2"];

      if (in_img !== null) {
        image(
          greenThresholdFilter(in_img, thresholdSlider.value()),
          posX,
          posY,
          in_img.width,
          in_img.height,
        );
      }
    };

    module.exports = {
      setup: setup,
      draw: draw,
    };
  });
})(window);
