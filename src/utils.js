import data from './data.json';

export function getRandomItem() {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}