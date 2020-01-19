// Simple script to save all SSR pages as static html

const axios = require('axios');
const { existsSync, mkdirSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { reduce } = require('lodash');
const characters = require('../src/assets/sorted-ids.json');

// Root Browser Directory
const rootBrowserDirectory = resolve('./dist/browser');

// Make sure there is an inkling directory on the dist otherwise create it
const inklingDirectory = `${rootBrowserDirectory}/inkling`;
if (!existsSync(inklingDirectory)) {
  mkdirSync(inklingDirectory);
}

// Make sure there is an inkling/vs directory on the dist otherwise create it
const vsDirectory = `${inklingDirectory}/vs`;
if (!existsSync(vsDirectory)) {
  mkdirSync(vsDirectory);
}

const asyncDownloadPage = async (urlPath, saveDirectory) => {
  // Make sure there is an inkling/vs/[character] directory on the dist otherwise create it
  if (!existsSync(saveDirectory)) {
    mkdirSync(saveDirectory);
  }

  // Load the HTML for the character
  const pageHtml = await axios.get(`http://localhost:4000${urlPath}`);

  // Save the file locally
  writeFileSync(`${saveDirectory}/index.html`, pageHtml.data);

  // Lets get the data title to make sure the SSR went alright
  const pageTitle = pageHtml.data.match(/<title>[^<]+<\/title>/);

  // Output a friendly log to know our progress
  console.log(`saved ${urlPath} ${pageTitle[0]}`);
}

const saveAllSitePages = async () => {
  // Go through each character page and slowly download each
  const totalSaved = await reduce(characters.ids, async (asyncAcc, characterId) => {
    let awaitedAcc = await asyncAcc;
    console.log(`URL: ${awaitedAcc}`);
    let validId = characterId;

    if (validId.indexOf('POKEMON_TRAINER') > -1 && validId !== 'POKEMON_TRAINER') {
      validId = validId.replace('POKEMON_TRAINER_', '');
    }

    const dasherizedName = validId.toLowerCase().replace(/_/g, '-');
    const characterDirectory = `${inklingDirectory}/vs/${dasherizedName}`;
    const characterUrlPath = `/inkling/vs/${dasherizedName}`;
    await asyncDownloadPage(characterUrlPath, characterDirectory);
    awaitedAcc++;
    return awaitedAcc;
  }, Promise.resolve(0));

  console.log(`TOTAL URLS: ${totalSaved}`);

  // Save Index directories for inkling root folders
  await asyncDownloadPage('/inkling', inklingDirectory);
  await asyncDownloadPage('/inkling/vs', vsDirectory);
  await asyncDownloadPage('/', rootBrowserDirectory);

  console.log('DONE!!!');
}

saveAllSitePages();
