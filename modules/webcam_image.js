(function (global) {
    global.registerModule('webcam_image', function (module) {
        let capture_button,
            capture,
            img;

        const setup = (posX, posY) => {
            capture_button = global.createButton('Capture', 255, 110);
            capture_button.position(posX + global.SINGLE_FRAME_WIDTH/2 - capture_button.width/2, posY + global.SINGLE_FRAME_HEIGHT - 20);

            global.pixelDensity(1);

            capture = global.createCapture(VIDEO);
            capture.size(global.SINGLE_FRAME_WIDTH, global.SINGLE_FRAME_HEIGHT);
            capture.hide();

            capture_button.mousePressed(captureImage);

            img = global.createImage(global.SINGLE_FRAME_WIDTH, global.SINGLE_FRAME_HEIGHT);
        }

        const draw = (posX, posY) => {
            global.fill(0, 0, 255)
            global.rect(posX, posY, 160, 120)

            global.image(capture, posX, posY, global.SINGLE_FRAME_WIDTH, global.SINGLE_FRAME_HEIGHT);
        }

        const captureImage = () => {
            window.modules.forEach(function (importedModule) {
                if (!IMAGES_MAP[importedModule.name]) {
                    IMAGES_MAP[importedModule.name] = global.createImage(capture.width, capture.height);
                }

                IMAGES_MAP[importedModule.name].copy(capture, 0, 0, capture.width, capture.height, 0, 0, img.width, img.height);
            });
        }

        module.exports = {
            setup: setup,
            draw: draw
        }
    })
})(window)
