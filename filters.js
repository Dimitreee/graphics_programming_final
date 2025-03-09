function extractBlueChannel(img) {
  var blueChannelImg = createImage(img.width, img.height);
  blueChannelImg.loadPixels();
  img.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (x + y * img.width) * 4;

      var b = img.pixels[index + 2];
      blueChannelImg.pixels[index + 0] = 0; // Red
      blueChannelImg.pixels[index + 1] = 0; // Green
      blueChannelImg.pixels[index + 2] = b; // Blue
      blueChannelImg.pixels[index + 3] = 255; // Alpha
    }
  }
  blueChannelImg.updatePixels();
  return blueChannelImg;
}

function extractHSV(img) {
  var hsvImage = createImage(img.width, img.height);
  hsvImage.loadPixels();
  img.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (x + y * img.width) * 4;

      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      // Convert RGB to HSV
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h,
        s,
        v = max;

      var d = max - min;
      s = max === 0 ? 0 : d / max;

      if (max === min) {
        h = 0; // achromatic
      } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      hsvImage.pixels[index + 0] = h * 255; // Hue
      hsvImage.pixels[index + 1] = s * 255; // Saturation
      hsvImage.pixels[index + 2] = v; // Value
      hsvImage.pixels[index + 3] = 255; // Alpha
    }
  }
  hsvImage.updatePixels();
  return hsvImage;
}

function extractLab(img) {
  var labImage = createImage(img.width, img.height);
  labImage.loadPixels();
  img.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (x + y * img.width) * 4;

      var r = img.pixels[index + 0] / 255;
      var g = img.pixels[index + 1] / 255;
      var b = img.pixels[index + 2] / 255;

      // Convert RGB to XYZ
      var xX = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      var yY = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      var zZ = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

      xX *= 100;
      yY *= 100;
      zZ *= 100;

      // Convert XYZ to CIELAB
      var xRef = 95.047; // D65
      var yRef = 100.0; // D65
      var zRef = 108.883; // D65

      var xL = xX / xRef;
      var yL = yY / yRef;
      var zL = zZ / zRef;

      xL = xL > 0.008856 ? Math.pow(xL, 1 / 3) : xL * 7.787 + 16 / 116;
      yL = yL > 0.008856 ? Math.pow(yL, 1 / 3) : yL * 7.787 + 16 / 116;
      zL = zL > 0.008856 ? Math.pow(zL, 1 / 3) : zL * 7.787 + 16 / 116;

      var L = 116 * yL - 16;
      var a = 500 * (xL - yL);
      var b = 200 * (yL - zL);

      // Store L*a*b values in the new image
      labImage.pixels[index + 0] = L; // L*
      labImage.pixels[index + 1] = a; // a*
      labImage.pixels[index + 2] = b; // b*
      labImage.pixels[index + 3] = 255; // Alpha
    }
  }
  labImage.updatePixels();
  return labImage;
}

function greyscaleFilter(img, brightness) {
  const imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (x = 0; x < imgOut.width; x++) {
    for (y = 0; y < imgOut.height; y++) {
      var index = (x + y * imgOut.width) * 4;

      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      // var gray = (r + g + b) / 3; // simple
      var gray = r * 0.299 + g * 0.587 + b * 0.114; // LUMA ratios

      if (brightness) {
        gray = gray * (1 + brightness / 100);
        gray = constrain(gray, 0, 255); // Ensure gray stays within valid range
      }

      imgOut.pixels[index + 0] =
        imgOut.pixels[index + 1] =
        imgOut.pixels[index + 2] =
          gray;
      imgOut.pixels[index + 3] = 255;
    }
  }

  imgOut.updatePixels();

  return imgOut;
}

function extractGreenChannel(img) {
  var greenChannelImg = createImage(img.width, img.height);
  greenChannelImg.loadPixels();
  img.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (x + y * img.width) * 4;

      var g = img.pixels[index + 1];
      greenChannelImg.pixels[index + 0] = 0; // Red
      greenChannelImg.pixels[index + 1] = g; // Green
      greenChannelImg.pixels[index + 2] = 0; // Blue
      greenChannelImg.pixels[index + 3] = 255; // Alpha
    }
  }
  greenChannelImg.updatePixels();
  return greenChannelImg;
}

function extractRedChannel(img) {
  var redChannelImg = createImage(img.width, img.height);
  redChannelImg.loadPixels();
  img.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (x + y * img.width) * 4;

      var r = img.pixels[index + 0];
      // Set red channel, green and blue to 0
      redChannelImg.pixels[index + 0] = r; // Red
      redChannelImg.pixels[index + 1] = 0; // Green
      redChannelImg.pixels[index + 2] = 0; // Blue
      redChannelImg.pixels[index + 3] = 255; // Alpha
    }
  }
  redChannelImg.updatePixels();
  return redChannelImg;
}

function globalTresholdFilter(img, threshold) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < imgOut.width; x++) {
    for (var y = 0; y < imgOut.height; y++) {
      var index = (x + y * imgOut.width) * 4;
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      var bright = (r + g + b) / 3;

      if (bright > threshold) {
        imgOut.pixels[index + 0] = 255;
        imgOut.pixels[index + 1] = 255;
        imgOut.pixels[index + 2] = 255;
        imgOut.pixels[index + 3] = 255;
      } else {
        imgOut.pixels[index + 0] = 0;
        imgOut.pixels[index + 1] = 0;
        imgOut.pixels[index + 2] = 0;
        imgOut.pixels[index + 3] = 255;
      }
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function redThresholdFilter(img, threshold) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (x = 0; x < imgOut.width; x++) {
    for (y = 0; y < imgOut.height; y++) {
      var index = (x + y * imgOut.width) * 4;
      var r = img.pixels[index + 0];
      var bright = r;

      if (bright > threshold) {
        imgOut.pixels[index + 0] = 255;
        imgOut.pixels[index + 1] = 255;
        imgOut.pixels[index + 2] = 255;
        imgOut.pixels[index + 3] = 255;
      } else {
        imgOut.pixels[index + 0] = 0;
        imgOut.pixels[index + 1] = 0;
        imgOut.pixels[index + 2] = 0;
        imgOut.pixels[index + 3] = 255;
      }
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function greenThresholdFilter(img, threshold) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (x = 0; x < imgOut.width; x++) {
    for (y = 0; y < imgOut.height; y++) {
      var index = (x + y * imgOut.width) * 4;
      var g = img.pixels[index + 1]; // Unused
      var bright = g; // Threshold based on green channel

      if (bright > threshold) {
        imgOut.pixels[index + 0] = 255;
        imgOut.pixels[index + 1] = 255;
        imgOut.pixels[index + 2] = 255;
        imgOut.pixels[index + 3] = 255;
      } else {
        imgOut.pixels[index + 0] = 0;
        imgOut.pixels[index + 1] = 0;
        imgOut.pixels[index + 2] = 0;
        imgOut.pixels[index + 3] = 255;
      }
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function blueThresholdFilter(img, threshold) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (x = 0; x < imgOut.width; x++) {
    for (y = 0; y < imgOut.height; y++) {
      var index = (x + y * imgOut.width) * 4;
      var b = img.pixels[index + 2];
      var bright = b;

      if (bright > threshold) {
        imgOut.pixels[index + 0] = 255;
        imgOut.pixels[index + 1] = 255;
        imgOut.pixels[index + 2] = 255;
        imgOut.pixels[index + 3] = 255;
      } else {
        imgOut.pixels[index + 0] = 0;
        imgOut.pixels[index + 1] = 0;
        imgOut.pixels[index + 2] = 0;
        imgOut.pixels[index + 3] = 255;
      }
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function pixelate(image, faces) {
  // If the faces array is empty, return the original image
  if (faces.length === 0) {
    return image;
  }

  // Create a new image to store the pixelated result
  var outImage = createImage(image.width, image.height);
  outImage.loadPixels();
  image.loadPixels();

  // Loop through each face in the faces array
  for (var f = 0; f < faces.length; f++) {
    var face = faces[f];
    var x = face[0];
    var y = face[1];
    var width = face[2];
    var height = face[3];

    // Loop through the face area in 5x5 blocks
    for (var blockX = x; blockX < x + width; blockX += 5) {
      for (var blockY = y; blockY < y + height; blockY += 5) {
        var totalIntensity = 0;
        var count = 0;

        // Calculate the average intensity for the 5x5 block
        for (var i = 0; i < 5; i++) {
          for (var j = 0; j < 5; j++) {
            var pixelX = blockX + i;
            var pixelY = blockY + j;

            // Ensure we stay within the image bounds
            if (pixelX < image.width && pixelY < image.height) {
              var pixelColor = image.get(pixelX, pixelY);
              var r = red(pixelColor);
              var g = green(pixelColor);
              var b = blue(pixelColor);

              // Convert to grayscale intensity
              var intensity = (r + g + b) / 3;
              totalIntensity += intensity;
              count++;
            }
          }
        }

        // Calculate the average pixel intensity
        var avePixInt = totalIntensity / count;

        // Paint the entire block with the average intensity
        for (var i = 0; i < 5; i++) {
          for (var j = 0; j < 5; j++) {
            var pixelX = blockX + i;
            var pixelY = blockY + j;

            // Ensure we stay within the image bounds
            if (pixelX < image.width && pixelY < image.height) {
              outImage.set(pixelX, pixelY, color(avePixInt)); // Set the pixel to the average intensity
            }
          }
        }
      }
    }
  }

  outImage.updatePixels();
  return outImage;
}
