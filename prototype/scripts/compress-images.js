const tinify = require('tinify');
tinify.key = 'R4Srvsg2F904GZxqLg3zQGzP5cjBWw6c';
const fs = require('fs');
const { parseCharacterId } = require('./helpers');

const tinySaveFilePromise = async (fromPath, toPath, resizeOptions) => {
  try {
    const source = tinify.fromFile(fromPath);
    const resized = source.resize(resizeOptions);
    await resized.toFile(toPath);
    return `saved ${toPath}`;
  } catch (error) {
    return `${fromPath}: ${error.message}`;
  }
}

const asyncOptimizeFiles = async () => {
  const originalFiles = fs.readdirSync('./originals');
  const optimizedFiles = fs.readdirSync('./optimized');
  const optimizedFilesDictionary = optimizedFiles.reduce((accumulator, optimizedFilename) => {
    accumulator[`optimized/${optimizedFilename}`] = true;
    return accumulator;
  }, {})
  let skippedTotal = 0;
  originalFiles.forEach(async (filename) => {
    if (filename.indexOf('.') === 0) {
      return;
    }
    const characterId = parseCharacterId(filename);
    const sourceFilePath = `originals/${filename}`;
    const resizeSize = 460;
    // const resizeSize = 272;

    [1, 2, 3].forEach(async (size) => {
      const saveFilePath = `optimized/${characterId}@${size}x.png`;
      const resizeOptions = {
        method: 'fit',
        width: resizeSize * size,
        height: resizeSize * size
      };

      if (optimizedFilesDictionary[saveFilePath]) {
        console.log(`skipped ${saveFilePath}`);
        skippedTotal++;
      } else {
        const fileSaved = await tinySaveFilePromise(sourceFilePath, saveFilePath, resizeOptions);
        console.log(fileSaved);
      }

    });
  });

  const skippedPercent = (skippedTotal / (originalFiles.length * 3)) * 100;
  console.log('skipped %', skippedPercent);
}

asyncOptimizeFiles();
