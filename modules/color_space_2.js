(function (global) {
    global.registerModule('color_space_2', function (module) {
        function setup() {
        }

        function draw(posX, posY) {
            global.fill(0, 0, 255)
            global.rect(posX, posY, 160, 120)

            const in_img = IMAGES_MAP['color_space_2'];

            if (in_img !== null) {
                image(global.extractLab(in_img), posX, posY, in_img.width, in_img.height);
            }
        }

        module.exports = {
            setup: setup,
            draw: draw
        }
    })
})(window)
