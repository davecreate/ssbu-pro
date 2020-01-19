const axios = require('axios');
const cheerio = require('cheerio');
const download = require('image-downloader');
const fs = require('fs');
const { parseCharacterId, parseMoveId } = require('./helpers');
const { get, find, last, entries, trim } = require('lodash');

const asyncDownloadImages = async () => {
  const wikiaHtml = await axios.get('https://www.ssbwiki.com/Super_Smash_Bros._Ultimate');
  const $ = cheerio.load(wikiaHtml.data);

  const charImgs = $('a[title$="(SSBU)"] img');

  const uniqueMoveIds = {};

  const offsetFromStages = 5;
  const csvFile = [
    'ID,MoveID,MovePrettyName,ImageFilename'
  ];
  for (let index = 0; index < charImgs.length - offsetFromStages; index++) {
  // for (let index = 0; index < 1; index++) {
    const img = charImgs[index];
    // console.log(imgSrc);
    const charId = parseCharacterId(img.parent.attribs.title);
    const charUrl = `https://www.ssbwiki.com${img.parent.attribs.href}`;
    const characterHtml = await axios.get(charUrl);
    const char$ = cheerio.load(characterHtml.data);
    const movesTable = char$('.mw-parser-output .wikitable tbody');
    const movesTableRows = movesTable[0].children;
    // console.log(movesTableRows);
    for (let rowIndex = 2; rowIndex < movesTableRows.length; rowIndex++) {
      const row = movesTableRows[rowIndex];
      if (row.name === 'tr' && charId.indexOf('MII_') !== 0) {
        const th = find(row.children, { name: 'th' });
        if (th && get(th, 'children[0].name') === 'a') {
          const csvRow = [charId];
          const moveDefaultName = get(th, 'children[0].children[0].data');
          const moveId = parseMoveId(moveDefaultName);
          const td = th.next.next;
          csvRow.push(moveId);

          // Keep track of unique Move Ids
          if (!uniqueMoveIds[moveId]) {
            uniqueMoveIds[moveId] = moveDefaultName;
          }

          // We'll use pretty name to know if we need this specific move in the CSV
          let prettyName;

          if (get(td, 'children[0].type') === 'tag' && get(td, 'children[0].name') === 'a') {
            prettyName = td.children[0].children[0].data.replace(/(↗|\n)/g, '').replace(/,/g, '|||');
            csvRow.push(prettyName); // Pretty name of the move

            const imagePage =  `https://www.ssbwiki.com${td.children[0].attribs.href}`;
            const imagePageHtml = await axios.get(imagePage);
            const imagePage$ = cheerio.load(imagePageHtml.data);
            const imageElement = imagePage$('.infobox img');

            if (imageElement && imageElement.length) {
              const imageUrl = `https://www.ssbwiki.com${imageElement[0].attribs.src}`;
              const fileExtention = last(imageElement[0].attribs.src.split('.'));
              const filePrettyName = `${charId}___${moveId}.${fileExtention}`;
              const downloadOptions = {
                url: imageUrl,
                dest: `./tmp/${filePrettyName}`
              }
              try {
                // await download.image(downloadOptions);
                csvRow.push(filePrettyName);
              } catch (error) {
                // console.log(error);
                csvRow.push(''); // Image filename is blank
                console.log('failed to download');
              }
            }
          } else {
            prettyName = get(td, 'children[0].data', '').replace(/(↗|\n)/g, '').replace(/,/g, '|||');
            csvRow.push(prettyName);
            csvRow.push(''); // Image filename is blank
          }

          // Remove empty spaces at the end or start of the string
          prettyName = trim(prettyName);

          if (prettyName) {
            const csvText = csvRow.join(',');
            console.log(csvText);
            csvFile.push(csvText);
          }
          else {
            console.log(`skipped ${charId} move ${moveId}`);
          }
        }
      }
    }
  }

  const moveIdCsv = [
    'MoveId,MoveName',
    ...entries(uniqueMoveIds).map(([k, v]) => `${k},${v}`),
  ].join('\n');

  fs.writeFileSync('./tmp/character-moves.csv', csvFile.join('\n'));
  fs.writeFileSync('./tmp/move-ids.csv', moveIdCsv);
  console.log('done');

};

asyncDownloadImages();
