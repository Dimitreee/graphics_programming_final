(function (global) {
    global.registerModule('face_detection', function (module) {
        var detector;
        var classifier = objectdetect.frontalface;
        var faces;
        var faceImg;

        function setup() {
            var scaleFactor = 1.2;
            detector = new objectdetect.detector(global.SINGLE_FRAME_WIDTH, global.SINGLE_FRAME_HEIGHT, scaleFactor, classifier);
            faceImg = global.createImage(global.SINGLE_FRAME_WIDTH, global.SINGLE_FRAME_HEIGHT);
        }

        function draw(posX, posY) {
            global.fill(0, 0, 255)
            global.rect(posX, posY, 160, 120)

            const in_img = IMAGES_MAP['color_space_1'];

            if (in_img !== null) {
                faceImg.copy(in_img, 0, 0, in_img.width, in_img.height, 0, 0, in_img.width, in_img.height);
                faces = detector.detect(faceImg.canvas);

                strokeWeight(2);
                stroke(255);
                noFill();

                for (var i= 0; i<faces.length; i++){
                    var face=faces[i];
                    if (face[4] > 4) {
                        rect(face[0] + posX, face[1] + posY, face[2], face[3]);
                    }
                }

                const detected_faces = faces.filter(face => face[4] > 4);

                image(faceImg, posX, posY, in_img.width, in_img.height);
                image(pixelate(faceImg, detected_faces), posX, posY, in_img.width, in_img.height);
            }
        }

        module.exports = {
            setup: setup,
            draw: draw
        }
    })
})(window)
