'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _intersectionWithLimit = require('../intersection-with-limit/intersection-with-limit');

var _intersectionWithLimit2 = _interopRequireDefault(_intersectionWithLimit);

var _concatAndRemoveDups = require('../concat-and-remove-dups/concat-and-remove-dups');

var _concatAndRemoveDups2 = _interopRequireDefault(_concatAndRemoveDups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (items, textKey) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    comparator = _ref.comparator,
    _ref$splitRegex = _ref.splitRegex,
    splitRegex = _ref$splitRegex === undefined ? /\s+/ : _ref$splitRegex;

  var data = items;
  var trie = {};

  var compareFunction = comparator ? function (id1, id2) {
    return comparator(items[id1], items[id2]);
  } : null;

  var addWord = function addWord(word, id, wordIndex) {
    var wordLength = word.length;
    var node = trie;

    for (var i = 0; i < wordLength; i++) {
      var letter = word[i];

      if (!node[letter]) {
        node[letter] = {
          ids: []
        };
      }

      if (!node[letter].ids[wordIndex]) {
        node[letter].ids[wordIndex] = [];
      }

      node[letter].ids[wordIndex].push(id);

      if (compareFunction) {
        node[letter].ids[wordIndex].sort(compareFunction);
      }

      node = node[letter];
    }
  };

  var addPhrase = function addPhrase(phrase, id) {
    var words = phrase.trim().toLowerCase().split(splitRegex);
    var wordsCount = words.length;

    for (var i = 0; i < wordsCount; i++) {
      addWord(words[i], id, i);
    }
  };

  var getWordIndices = function getWordIndices(word) {
    var wordLength = word.length;
    var node = trie;

    for (var i = 0; i < wordLength; i++) {
      if (node[word[i]]) {
        node = node[word[i]];
      } else {
        return [];
      }
    }

    var ids = node.ids;
    var length = ids.length;
    var result = [];

    for (var _i = 0; _i < length; _i++) {
      if (ids[_i]) {
        result = (0, _concatAndRemoveDups2.default)(result, ids[_i]);
      }
    }

    return result;
  };

  var getPhraseIndices = function getPhraseIndices(phrase, _ref2) {
    var limit = _ref2.limit,
      _ref2$splitRegex = _ref2.splitRegex,
      splitRegex = _ref2$splitRegex === undefined ? /\s+/ : _ref2$splitRegex;

    var words = phrase.toLowerCase().split(splitRegex).filter(Boolean);

    if (words.length === 0) {
      return [];
    }

    var wordsCount = words.length;
    var indicesArray = [];

    for (var i = 0; i < wordsCount; i++) {
      indicesArray[indicesArray.length] = getWordIndices(words[i]);
    }

    return (0, _intersectionWithLimit2.default)(indicesArray, limit);
  };

  var getMatches = function getMatches(query) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var indices = getPhraseIndices(query, options);
    var indicesCount = indices.length;
    var result = [];

    for (var i = 0; i < indicesCount; i++) {
      result[result.length] = data[indices[i]];
    }

    return result;
  };

  var itemsCount = items.length;

  for (var i = 0; i < itemsCount; i++) {
    addPhrase(items[i][textKey], i);
  }

  return {
    getMatches: getMatches,
    data: data
  };
};