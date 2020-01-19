import { storiesOf, moduleMetadata } from '@storybook/angular';
import { DebugCharacterCropperComponent } from 'src/app/components/debug-character-cropper/debug-character-cropper.component';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { CharacterCropComponent } from 'src/app/components/character-crop/character-crop.component';

const stories = storiesOf('Tools', module);

const ids = [
  'MARIO',
  'DONKEY_KONG',
  'LINK',
  'SAMUS',
  'DARK_SAMUS',
  'YOSHI',
  'KIRBY',
  'FOX',
  'PIKACHU',
  'LUIGI',
  'NESS',
  'CAPTAIN_FALCON',
  'JIGGLYPUFF',
  'PEACH',
  'DAISY',
  'BOWSER',
  'ICE_CLIMBERS',
  'SHEIK',
  'ZELDA',
  'DR_MARIO',
  'PICHU',
  'FALCO',
  'MARTH',
  'LUCINA',
  'YOUNG_LINK',
  'GANONDORF',
  'MEWTWO',
  'ROY',
  'CHROM',
  'MR_GAME_AND_WATCH',
  'META_KNIGHT',
  'PIT',
  'DARK_PIT',
  'ZERO_SUIT_SAMUS',
  'WARIO',
  'SNAKE',
  'IKE',
  'POKEMON_TRAINER',
  'POKEMON_TRAINER_SQUIRTLE',
  'POKEMON_TRAINER_IVYSAUR',
  'POKEMON_TRAINER_CHARIZARD',
  'DIDDY_KONG',
  'LUCAS',
  'SONIC',
  'KING_DEDEDE',
  'OLIMAR',
  'LUCARIO',
  'R_O_B',
  'TOON_LINK',
  'WOLF',
  'VILLAGER',
  'MEGA_MAN',
  'WII_FIT_TRAINER',
  'ROSALINA_AND_LUMA',
  'LITTLE_MAC',
  'GRENINJA',
  'PALUTENA',
  'PAC_MAN',
  'ROBIN',
  'SHULK',
  'BOWSER_JR',
  'DUCK_HUNT',
  'RYU',
  'KEN',
  'CLOUD',
  'CORRIN',
  'BAYONETTA',
  'INKLING',
  'RIDLEY',
  'SIMON',
  'RICHTER',
  'KING_K_ROOL',
  'ISABELLE',
  'INCINEROAR',
  'PIRANHA_PLANT',
  'JOKER',
  'HERO',
  'MII_BRAWLER',
  'MII_SWORDFIGHTER',
  'MII_GUNNER',
  'BANJO_AND_KAZOOIE',
  'TERRY'
].filter((id) => {
  return id !== 'POKEMON_TRAINER_SQUIRTLE'
  && id !== 'POKEMON_TRAINER_IVYSAUR'
  && id !== 'POKEMON_TRAINER_CHARIZARD';
});

// "withKnobs" decorator should be applied before the stories using knobs
stories.addDecorator(withKnobs);
stories.addDecorator(moduleMetadata({
  declarations: [
    CharacterCropComponent,
  ],
}));

stories.add('Character Cropper', () => {
  const cropOpacityLabel = 'Crop Opacity';
  const cropOpacityDefaultValue = 0.5;
  const cropOpacityOptions = {
    range: true,
    min: 0,
    max: 1,
    step: 0.1,
  };

  const leftPercentLabel = 'Crop Left %';
  const leftPercentDefaultValue = -56;
  const leftPercentOptions = {
    range: true,
    min: -500,
    max: 500,
    step: 1,
  };

  const topPercentLabel = 'Crop Top %';
  const topPercentDefaultValue = -29;
  const topPercentOptions = {
    range: true,
    min: -500,
    max: 500,
    step: 1,
  };

  const scalePercentLabel = 'Crop Scale %';
  const scalePercentDefaultValue = 85;
  const scalePercentOptions = {
    range: true,
    min: 50,
    max: 500,
    step: 1,
  };

  const referenceOpacityLabel = 'Reference Opacity';
  const referenceOpacityDefaultValue = 0.5;
  const referenceOpacityOptions = {
    range: true,
    min: 0,
    max: 1,
    step: 0.1,
  };

  const characterIdLabel = 'Character Id';
  const characterIdDefaultValue = 'YOSHI';
  const characterIdOptions = ids.reduce((accumulator, id) => {
    return {
      ...accumulator,
      [id]: id,
    };
  }, {});

  const referenceFrameX = 536;
  const referenceFrameY = 358;
  const referenceCoordinatesByAssetPath = ids.reduce((accumulator, id, index) => {
    const xModulo = index % 13;
    const yModulo = Math.floor(index / 13);
    const yCoordinate = yModulo * -referenceFrameY;
    const xCoordinate = xModulo * -referenceFrameX;
    return {
      ...accumulator,
      [id]: {
        x: xCoordinate,
        y: yCoordinate,
      },
    };
  }, {});

  const characterId = select(characterIdLabel, characterIdOptions, characterIdDefaultValue);
  const cropOpacity = number(cropOpacityLabel, cropOpacityDefaultValue, cropOpacityOptions);
  const cropPercentLeft = number(leftPercentLabel, leftPercentDefaultValue, leftPercentOptions);
  const cropPercentTop = number(topPercentLabel, topPercentDefaultValue, topPercentOptions);
  const cropPercentScale = number(scalePercentLabel, scalePercentDefaultValue, scalePercentOptions);
  const referenceOpacity = number(referenceOpacityLabel, referenceOpacityDefaultValue, referenceOpacityOptions);
  const valueX = referenceCoordinatesByAssetPath[characterId].x;
  const valueY = referenceCoordinatesByAssetPath[characterId].y;


  return {
    component: DebugCharacterCropperComponent,
    props: {
      totalIds: ids.length,
      referenceTransform: `translate3d(${valueX}px, ${valueY}px, 0)`,
      referenceOpacity,
      cropPercentLeft,
      cropPercentTop,
      cropPercentScale,
      cropOpacity,
      characterId,
    },
  };
});
