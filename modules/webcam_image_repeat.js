(function (global) {
    global.registerModule('webcam_image_repeat', function (module) {
        function setup() {

        }

        function draw(posX, posY) {
            // draw box with green color on posX and posY with 160x120 size
            global.fill(0, 0, 255)
            global.rect(posX, posY, 160, 120)

            const in_img = IMAGES_MAP['webcam_image_repeat'];

            if (in_img !== null) {
                image(in_img, posX, posY, in_img.width, in_img.height);
            }
        }

        module.exports = {
            setup: setup,
            draw: draw
        }
    })
})(window)
