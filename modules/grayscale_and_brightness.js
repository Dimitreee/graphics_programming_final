(function (global) {
  global.registerModule("grayscale_and_brightness", function (module) {
    var grayScaleBrightnessSlider;

    function setup(posX, posY) {
      // Increase brightness by 20% default
      grayScaleBrightnessSlider = global.createSlider(0, 100, 20);

      grayScaleBrightnessSlider.position(
        posX +
          global.SINGLE_FRAME_WIDTH / 2 -
          grayScaleBrightnessSlider.width / 2,
        posY + global.SINGLE_FRAME_HEIGHT - 20,
      );
    }

    function draw(posX, posY) {
      global.fill(0, 0, 255);
      global.rect(posX, posY, 160, 120);

      const in_img = IMAGES_MAP["grayscale_and_brightness"];

      if (in_img !== null) {
        global.image(
          global.greyscaleFilter(in_img, grayScaleBrightnessSlider.value()),
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
