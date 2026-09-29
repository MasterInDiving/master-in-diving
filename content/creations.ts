import type { CreationItem } from './types';

/**
 * Paintings shown in the "art" section.
 *
 * Each `id` is the file stem in public/creations/ (and source-photos/creations/):
 * "sunglasses-girl" -> sunglasses-girl-480.avif, -900.avif, -1400.avif, and the
 * matching .webp/.jpg. Drop a new photo into source-photos/creations/ and run
 * `npm run images` — it prints the width/height/aspect to copy into a new
 * entry here (see scripts/optimize-images.mjs, buildCreations()).
 *
 * `sizeCm` is only set when the physical size was actually given — several
 * photos had it printed in a corner of the photo itself, which was cropped
 * off before publishing; that number is copied here as plain text instead.
 * `status` and `priceUsd` come from Kostya's own price list; nothing here
 * is invented, and no title is added beyond the plain visual description
 * in `alt`.
 */
export const CREATIONS: readonly CreationItem[] = [
  {
    id: 'marilyn-triptych',
    widths: [480, 900, 1400],
    width: 2000,
    height: 2000,
    status: 'sold',
    alt: {
      ru: 'Триптих: чёрно-белый портрет Мэрилин Монро в центре и два цветных профиля девушек по бокам',
      uk: 'Триптих: чорно-білий портрет Мерилін Монро в центрі та два кольорові профілі дівчат по боках',
      en: 'A triptych: a black-and-white portrait of Marilyn Monroe flanked by two colourful side profiles',
    },
  },
  {
    id: 'blue-hair-kiss',
    widths: [480, 900, 1400],
    width: 2000,
    height: 2000,
    sizeCm: '50 × 50',
    status: 'available',
    priceUsd: 150,
    alt: {
      ru: 'Портрет девушки с ярко-голубыми волосами, собранными в два пучка, и губами, сложенными для поцелуя',
      uk: 'Портрет дівчини з яскраво-блакитним волоссям, зібраним у два пучки, і губами, складеними для поцілунку',
      en: 'A portrait of a girl with bright blue hair in two buns, lips pursed for a kiss',
    },
  },
  {
    id: 'snoop-dogg',
    widths: [480, 900, 1400],
    width: 2000,
    height: 1500,
    sizeCm: '40 × 50',
    status: 'available',
    priceUsd: 200,
    alt: {
      ru: 'Портрет Снуп Дога с сигаретой у микрофона, в стиле поп-арт',
      uk: 'Портрет Снуп Дога із сигаретою біля мікрофона, у стилі поп-арт',
      en: 'A pop-art portrait of Snoop Dogg smoking by a microphone',
    },
  },
  {
    id: 'cowgirl',
    widths: [480, 900, 1400],
    width: 1122,
    height: 1402,
    sizeCm: '60 × 60',
    status: 'available',
    priceUsd: 150,
    alt: {
      ru: 'Портрет девушки в ковбойской шляпе, с разноцветными глазами — зелёным и голубым',
      uk: 'Портрет дівчини в ковбойському капелюсі, з різнокольоровими очима — зеленим і блакитним',
      en: 'A portrait of a girl in a cowboy hat, with one green eye and one blue',
    },
  },
  {
    id: 'puzzle-smiley',
    widths: [480, 900, 1400],
    width: 1280,
    height: 1280,
    sizeCm: '60 × 60',
    status: 'available',
    priceUsd: 120,
    alt: {
      ru: 'Улыбающийся смайл, собранный из объёмных пазлов, на розовом фоне с брызгами краски',
      uk: 'Усміхнений смайл, зібраний з об’ємних пазлів, на рожевому тлі з бризками фарби',
      en: 'A smiley face built from raised puzzle pieces on a pink, paint-splattered background',
    },
  },
  {
    id: 'rock-guitar-girl',
    widths: [480, 900, 1400],
    width: 1391,
    height: 1855,
    sizeCm: '50 × 60',
    status: 'available',
    priceUsd: 200,
    alt: {
      ru: 'Портрет девушки с высунутым языком и рок-жестом рукой рядом с электрогитарой',
      uk: 'Портрет дівчини з висолопленим язиком і рок-жестом рукою біля електрогітари',
      en: 'A portrait of a girl sticking her tongue out with a rock-and-roll hand sign, next to an electric guitar',
    },
  },
  {
    id: 'guitar-abstract',
    widths: [480, 900],
    width: 960,
    height: 1280,
    status: 'available',
    priceUsd: 70,
    alt: {
      ru: 'Абстрактная акустическая гитара, написанная пальцами в ярких красках',
      uk: 'Абстрактна акустична гітара, написана пальцями в яскравих фарбах',
      en: 'An abstract acoustic guitar painted with fingers in bright colours',
    },
  },
  {
    id: 'sunglasses-girl',
    widths: [480, 900, 1400],
    width: 1280,
    height: 1075,
    sizeCm: '40 × 50',
    status: 'available',
    priceUsd: 70,
    alt: {
      ru: 'Портрет девушки в зеркальных солнцезащитных очках и жёлтой шапке',
      uk: 'Портрет дівчини в дзеркальних сонцезахисних окулярах і жовтій шапці',
      en: 'A portrait of a girl in mirrored sunglasses and a yellow beanie',
    },
  },
  {
    id: 'mickey-best-pop-art',
    widths: [480, 900, 1400],
    width: 1280,
    height: 1075,
    sizeCm: '50 × 70',
    status: 'available',
    priceUsd: 100,
    alt: {
      ru: 'Микки Маус в стиле граффити, закрывший глаза руками, среди надписей «Best Pop Art»',
      uk: 'Міккі Маус у стилі графіті, що закрив очі руками, серед написів «Best Pop Art»',
      en: 'A graffiti-style Mickey Mouse covering his eyes with his hands, surrounded by "Best Pop Art" lettering',
    },
  },
  {
    id: 'mickey-paint-your-life',
    widths: [480, 900, 1400],
    width: 1280,
    height: 935,
    status: 'available',
    priceUsd: 70,
    alt: {
      ru: 'Коллаж с несколькими персонажами Диснея и надписью «You paint your own life»',
      uk: 'Колаж із кількома персонажами Діснея та написом «You paint your own life»',
      en: 'A collage of several Disney characters with the lettering "You paint your own life"',
    },
  },
  {
    id: 'wheelchair-balloons',
    widths: [480, 900, 1400],
    width: 1280,
    height: 1080,
    sizeCm: '40 × 60',
    status: 'sold',
    alt: {
      ru: 'Силуэт человека, поднимающегося в воздух с гроздью воздушных шаров, рядом стоит пустая инвалидная коляска',
      uk: 'Силует людини, що піднімається в повітря з гроном повітряних кульок, поруч стоїть порожній інвалідний візок',
      en: 'A figure lifting off the ground holding a bunch of balloons, an empty wheelchair standing beside them',
    },
  },
  {
    id: 'gray-hair-woman',
    widths: [480, 900, 1400],
    width: 1280,
    height: 1075,
    sizeCm: '35 × 50',
    status: 'available',
    priceUsd: 50,
    alt: {
      ru: 'Портрет девушки с пепельно-серыми волосами на ярком разноцветном фоне',
      uk: 'Портрет дівчини з попелясто-сірим волоссям на яскравому різнокольоровому тлі',
      en: 'A portrait of a woman with ash-grey hair against a bright, multicoloured background',
    },
  },
  {
    id: 'pink-hair-super',
    widths: [480, 900, 1400],
    width: 1500,
    height: 1710,
    sizeCm: '50 × 70',
    status: 'available',
    priceUsd: 200,
    alt: {
      ru: 'Девушка в очках с розовыми пучками волос среди надписей в стиле граффити, включая «Stop trying to be perfect»',
      uk: 'Дівчина в окулярах з рожевими пучками волосся серед написів у стилі графіті, зокрема «Stop trying to be perfect»',
      en: 'A girl in glasses with pink hair buns among graffiti-style lettering, including "Stop trying to be perfect"',
    },
  },
  {
    id: 'astronaut',
    widths: [480, 900],
    width: 960,
    height: 1050,
    sizeCm: '60 × 60',
    status: 'available',
    priceUsd: 100,
    alt: {
      ru: 'Космонавт в невесомости среди мотивационных надписей на тёмном космическом фоне',
      uk: 'Космонавт у невагомості серед мотиваційних написів на темному космічному тлі',
      en: 'An astronaut floating among motivational lettering on a dark space background',
    },
  },
  {
    id: 'diptych-gold-black',
    widths: [480, 900, 1400],
    width: 1280,
    height: 855,
    sizeCm: '2 × 40 × 40',
    status: 'available',
    priceUsd: 70,
    alt: {
      ru: 'Диптих из двух текстурных панелей — чёрной и золотой — с рельефной круговой фактурой',
      uk: 'Диптих із двох текстурних панелей — чорної та золотої — з рельєфною круговою фактурою',
      en: 'A diptych of two textured panels, black and gold, each with a raised circular texture',
    },
  },
];
