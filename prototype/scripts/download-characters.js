const axios = require('axios');
const cheerio = require('cheerio');
const download = require('image-downloader');
const fs = require('fs');
const { parseCharacterId } = require('./helpers');

const asyncDownloadImages = async () => {
  const wikiaHtml = await axios.get('https://www.ssbwiki.com/Super_Smash_Bros._Ultimate');
  const $ = cheerio.load(wikiaHtml.data);

  const charImgs = $('a[title$="(SSBU)"] img');

  const offsetFromStages = 6;
  const characterIds = [];
  for (let index = 0; index < charImgs.length - offsetFromStages; index++) {
    const img = charImgs[index];
    const imgSrc = img.attribs.src;
    const charUrl = imgSrc.replace(/\/images\/thumb\/(.*?)\/(.*?)\/(.*?)\/\d.*$/, 'https://www.ssbwiki.com/images/$1/$2/$3');
    const charId = parseCharacterId(img.parent.attribs.title);
    const downloadOptions = {
      url: charUrl,
      dest: './tmp'
    }

    try {
      const { filename, image } = await download.image(downloadOptions);
      console.log(filename);
      characterIds.push(charId);
    } catch (error) {
      console.log('failed to download', charUrl);
    }
  }

  const data = JSON.stringify({
    ids: characterIds
  });
  fs.writeFileSync('./tmp/_ids.json', data);
};

asyncDownloadImages();
