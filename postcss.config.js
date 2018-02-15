const rucksack = require('rucksack-css');
const autoprefixer = require('autoprefixer');
const lost = require('lost');
const cssnano = require('cssnano');

module.exports = {
  plugins: [rucksack, autoprefixer, lost, cssnano]
};
