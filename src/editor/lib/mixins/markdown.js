// import hljsLangs from '../core/hljs/lang.hljs.js';
// import { loadScript } from '../core/extra-function.js';
const markdownConfig = {
  // Enable HTML tags in source
  html: true,
  // Use '/' to close single tags (<br />).
  xhtmlOut: true,
  // Convert '\n' in paragraphs into <br>
  breaks: true,
  // CSS language prefix for fenced blocks.
  langPrefix: 'language-',
  // 自动识别 url
  linkify: false,
  typographer: true,
  quotes: '“”‘’',
};

const markdown = require('markdown-it')(markdownConfig);
// 表情
const emoji = require('markdown-it-emoji');
// 下标
const sub = require('markdown-it-sub');
// 上标
const sup = require('markdown-it-sup');
// <dl/>
const deflist = require('markdown-it-deflist');
// <abbr/>
const abbr = require('markdown-it-abbr');
// footnote
const footnote = require('markdown-it-footnote');
// insert 带有下划线 样式 ++ ++
const insert = require('markdown-it-ins');
// mark
const mark = require('markdown-it-mark');
// taskLists
const taskLists = require('markdown-it-task-lists');
// container
const container = require('markdown-it-container');
//
const toc = require('markdown-it-toc');
// add target="_blank" to all link
const defaultRender = markdown.renderer.rules.link_open || function render(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

markdown.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  // If you are sure other plugins can't add `target` - drop check below
  const aIndex = tokens[idx].attrIndex('target');

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank'; // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};

// const mihe = require('markdown-it-highlightjs-external');
// math katex
const katex = require('markdown-it-katex-external');
const miip = require('markdown-it-images-preview');
// let missLangs = {};
// let needLangs = [];
// const hljsOpts = {
//   hljs: 'auto',
//   highlighted: true,
//   langCheck(lang) {
//     if (lang && hljsLangs[lang] && !missLangs[lang]) {
//       missLangs[lang] = 1;
//       needLangs.push(lang);
//     }
//   },
// };
markdown
  // .use(mihe, hljsOpts)
  .use(emoji)
  .use(sup)
  .use(sub)
  .use(container)
  .use(container, 'hljs-left') /* align left */
  .use(container, 'hljs-center')/* align center */
  .use(container, 'hljs-right')/* align right */
  .use(deflist)
  .use(abbr)
  .use(footnote)
  .use(insert)
  .use(mark)
  .use(container)
  .use(miip)
  .use(katex)
  .use(taskLists)
  .use(toc);

export default {
  data() {
    return {
      markdownIt: markdown,
    };
  },
  mounted() {
    // hljsOpts.highlighted = this.ishljs;
  },
  methods: {
    $render(src, func) {
      // const $vm = this;
      // missLangs = {};
      // needLangs = [];
      const res = markdown.render(src);
      // if (this.ishljs) {
      //   if (needLangs.length > 0) {
      //     $vm.$_render(src, func, res);
      //   }
      // }
      func(res);
    },
    // $_render(src, func, res) {
    //   let deal = 0;
    //
    //   const loadCallback = () => {
    //     deal += 1;
    //     if (deal === needLangs.length) {
    //       res = markdown.render(src);
    //       func(res);
    //     }
    //   };
    //
    //   for (let i = 0; i < needLangs.length; i++) {
    //     const url = this.p_external_link.hljs_lang(needLangs[i]);
    //     loadScript(url, loadCallback);
    //   }
    // },
  },
  watch: {
    ishljs() {
      // hljsOpts.highlighted = val;
    },
  },
};
