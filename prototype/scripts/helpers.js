module.exports.parseCharacterId = (name) => {
 const id = name
  .replace('.png', '')
  .replace('&', 'and')
  .replace(/(\.|\s|-)+/g, '_')
  .replace(/_\(?SSBU\)?/, '')
  .replace(/\([^\)]*\)/, '')
  .toUpperCase()
  .replace(/__+/, '_')
  .replace(/_$/, '')
  .replace('É', 'E');

  if (
    id === 'CHARIZARD'
    || id === 'IVYSAUR'
    || id === 'SQUIRTLE'
  ) {
    return `POKEMON_TRAINER_${id}`;
  }

  return id;
};

module.exports.parseMoveId = (name) => {
  const id = name
   .replace('.png', '')
   .replace('&', 'and')
   .replace(/(\.|\s|-)+/g, '_')
   .replace(/_\(?SSBU\)?/, '')
   .replace(/__+/, '_')
   .replace(/\(([^\)]*)\)/, '_$1')
   .toUpperCase()
   .replace(/_$/, '')
   .replace('É', 'E');

   if (
     id === 'CHARIZARD'
     || id === 'IVYSAUR'
     || id === 'SQUIRTLE'
   ) {
     return `POKEMON_TRAINER_${id}`;
   }

   return id;
 };
