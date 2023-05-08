function countWords(str) {
  return str.split(/\s+/).filter(Boolean).length;
}

module.exports = countWords
