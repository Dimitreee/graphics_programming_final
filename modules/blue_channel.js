(function (global) {
    global.registerModule('blue_channel', function (module) {
        function setup() {
        }

        function draw(posX, posY) {
            global.fill(0, 0, 255)
            global.rect(posX, posY, 160, 120)

            const in_img = IMAGES_MAP['blue_channel'];

            if (in_img !== null) {
                image(in_img, posX, posY, in_img.width, in_img.height);
                image(global.extractBlueChannel(in_img), posX, posY, in_img.width, in_img.height);
            }
        }

        module.exports = {
            setup: setup,
            draw: draw
        }
    })
})(window);
