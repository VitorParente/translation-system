const dictionary = {
  hello: 'hola',
  world: 'mundo',
  how: 'cómo',
  are: 'estás',
  you: 'tú',
};

function translateText(text, toLang) {
  return text
    .split(' ')
    .map(word => dictionary[word.toLowerCase()] || word)
    .join(' ');
}

module.exports = translateText;
