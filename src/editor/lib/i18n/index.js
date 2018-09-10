
export default {
  langList: ['en', 'fr', 'ptBR', 'zhCN'],
  helps: {
    en: require('./en/help.md'),
    fr: require('./fr/help.md'),
    ptBr: require('./ptBR/help.md'),
    zhCN: require('./zhCN/help.md'),
  },
  words: {
    en: require('./en/words'),
    fr: require('./fr/words'),
    ptBr: require('./ptBR/words'),
    zhCN: require('./zhCN/words'),
  },
};
