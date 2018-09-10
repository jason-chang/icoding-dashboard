
const toMarkdown = require('src/Editor/lib/core/to-markdown');
//
const coverterP = {
  filter: 'P',
  replacement(content) {
    return `\n${content}`;
  },
};
const coverterp = {
  filter: 'p',
  replacement(content) {
    return `\n${content}`;
  },
};
const coverterDiv = {
  filter: 'DIV',
  replacement(content) {
    return `\n${content}`;
  },
};
const coverterdiv = {
  filter: 'div',
  replacement(content) {
    return `\n${content}`;
  },
};
// 解析代码块
const coverterCode = {
  filter: 'pre',
  replacement(content) {
    const objE = document.createElement('div');
    objE.innerHTML = content;
    const codes = objE.getElementsByTagName('code');
    if (codes !== null && codes.length > 0) {
      const code = codes[0];
      const codeType = code.getAttribute('class') === null ? '' : code.getAttribute('class');
      const codeContent = code.innerText;
      return `\n\`\`\`${codeType}\n${codeContent}\n\`\`\`\n`;
    }
    return `\n\`\`\`\n${content}\n\`\`\`\n`;
  },
};
// 解析表格
const coverterTable = {
  filter: 'table',
  replacement(content) {
    const table = document.createElement('table');
    table.innerHTML = content;
    let dom = '\n';
    let tableMark = '';
    const thead = table.getElementsByTagName('thead')[0];
    const thead_tr = thead.getElementsByTagName('tr')[0];
    const thead_th = thead_tr.getElementsByTagName('th');
    for (let i = 0; i < thead_th.length; i++) {
      dom += `| ${thead_th[i].innerText} `;
      const text_align = thead_th[i].style.textAlign;
      if (text_align === 'left') {
        tableMark += '| :- ';
      } else if (text_align === 'center') {
        tableMark += '| :-: ';
      } else if (text_align === 'right') {
        tableMark += '| -: ';
      } else {
        tableMark += '| - ';
      }
      if (i === thead_th.length - 1) {
        dom += `|\n${tableMark} |\n`;
      }
    }
    let tbody;
    if (table.getElementsByTagName('tbody')) {
      tbody = table.getElementsByTagName('tbody')[0];
      const tbody_tr = tbody.getElementsByTagName('tr');
      if (tbody_tr.length > 0) {
        for (let i = 0; i < tbody_tr.length; i++) {
          const tbody_td = tbody_tr[i].getElementsByTagName('td');
          for (let j = 0; j < tbody_td.length; j++) {
            dom += `| ${tbody_td[j].innerText} `;
            if (j === tbody_td.length - 1) {
              dom += '|\n';
            }
          }
        }
      }
    }
    return dom;
  },
};
// 上角标
const coverterSup = {
  filter: 'sup',
  replacement(content) {
    return `^${content}^`;
  },
};
// 下角标
const coverterSub = {
  filter: 'sub',
  replacement(content) {
    return `~${content}~`;
  },
};
// 下划线
const coverterUnderline = {
  filter: 'ins',
  replacement(content) {
    return `++${content}++`;
  },
};
// 中画线
const coverterStrikethrough = {
  filter: 's',
  replacement(content) {
    return `~~${content}~~`;
  },
};
// 标记
const coverterMark = {
  filter: 'mark',
  replacement(content) {
    return `==${content}==`;
  },
};
// 图片
const converterImg = {
  filter: 'img',
  replacement(content, tag) {
    const rel = tag.getAttribute('rel');
    const alt = tag.getAttribute('alt');
    if (rel && alt) {
      return `![${alt}]` + `(${rel})`;
    }
        
    const src = tag.getAttribute('src');
    return `![${alt}]` + `(${src})`;
        
  },
};
const tomarkdown = function (str) {
  return toMarkdown(str, {
    converters: [
      coverterCode,
      coverterTable,
      coverterSup,
      coverterSub,
      coverterUnderline,
      coverterStrikethrough,
      coverterMark,
      coverterP,
      coverterp,
      coverterDiv,
      coverterdiv,
      converterImg,
    ],
  });
};
export default tomarkdown;
