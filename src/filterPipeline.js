const ditherFilter = require('./dither');

const minMax = (value, min, max) => (
  Math.min(Math.max(value, min), max)
);

const brightnessFilter = (imageData, value) => {
  value = minMax(value, -100, 100);

  for (var i = 0; i < imageData.length; i += 4) {
    imageData[i] = minMax(imageData[i] + (255 * (value / 100)), 0, 255);
    imageData[i + 1] = minMax(imageData[i + 1] + (255 * (value / 100)), 0, 255);
    imageData[i + 2] = minMax(imageData[i + 2] + (255 * (value / 100)), 0, 255);
  }
  return imageData;
};

const lumaFilter = (imageData) => {
  const d = imageData;
  for (var i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];

    const luma = r * 0.2126 + g * 0.7152 + b * 0.0722;

    d[i] = d[i + 1] = d[i + 2] = luma;
  }
  return imageData;
};

const filterPipeline = (
  imageData,
  {
    brightness = 0, // -100 - 100
    contrast = 7, // 0 - 15
    lowLight = false,
  } = {},
) => {
  imageData = brightnessFilter(imageData, brightness);
  imageData = lumaFilter(imageData);
  imageData = ditherFilter(imageData, contrast, lowLight);
  return imageData;
};

module.exports = filterPipeline;
