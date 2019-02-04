const config = {
  ARRAYS: 5,
  ITEMS_PER_CHAR: 25,
  ITEM_MAX_Y: 250,
  COLORS: ['#fff489', '#fa57c1', '#b166cc', '#7572ff', '#69a6f9'],
  dataStyle: {
    fill: (d) => config.COLORS[d.x % config.ARRAYS],
  },
  DEBOUNCED_WAIT_MS: 750,
};

export default config;
