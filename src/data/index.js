import config from '../config';

const generateData = chars => {
  let count = chars * config.ITEMS_PER_CHAR || config.ITEMS_PER_CHAR;
  let data = [];

  for (let i = 0; i < config.ARRAYS; i++) {
    data.push([]);
    for (let j = 0; j < count; j++) {
      data[i].push(
        {
          x: j + 1,
          y: Math.floor(Math.random() * config.ITEM_MAX_Y),
        });
    }
  }

  return data;
}

export default generateData;