
function $ToolbarLeftUndoClick($vm) {
  if ($vm.d_history_index > 0) {
    $vm.d_history_index--;
  }
  // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.localText)
  if ($vm.s_preview_switch) {
    let start = $vm.getTextareaDom().selectionStart;
    const currentLength = $vm.localText.length;
    $vm.$nextTick(() => {
      // 光标操作
      start -= currentLength - $vm.localText.length;
      $vm.getTextareaDom().selectionStart = start;
      $vm.getTextareaDom().selectionEnd = start;
    });
  }
}

// redo
function $ToolbarLeftRedoClick($vm) {
  if ($vm.d_history_index < $vm.d_history.length - 1) {
    $vm.d_history_index++;
  }
  // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.localText)
}

function $ToolbarLeftTrashClick($vm) {
  $vm.localText = '';
  // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.localText)
}

function $ToolbarLeftSaveClick($vm) {
  $vm.save($vm.localText, $vm.previewText);
}

// ol
function $ToolbarLeftOlClick($vm) {
  $vm.insertOl();
}

// ul
function $ToolbarLeftUlClick($vm) {
  $vm.insertUl();
}

function $ToolbarLeftRemoveLineClick($vm) {
  $vm.removeLine();
}

// 直接添加链接
export const toolbarLeftAddlink = (type, text, link, $vm) => {

  const insertText = {
    prefix: type === 'link' ? `[${text}](` : `![${text}](`,
    subfix: ')',
    str: link,
  };

  $vm.insertText($vm.getTextareaDom(), insertText);
};

export function toolbarLeftClick(type, $vm) {
  const paramOfInsertText = {
    bold: {
      prefix: '**',
      subfix: '**',
      str: $vm.words.tl_bold,
    },
    italic: {
      prefix: '*',
      subfix: '*',
      str: $vm.words.tl_italic,
    },
    header: {
      prefix: '# ',
      subfix: '',
      str: $vm.words.tl_header,
    },
    header1: {
      prefix: '# ',
      subfix: '',
      str: $vm.words.tl_header_one,
    },
    header2: {
      prefix: '## ',
      subfix: '',
      str: $vm.words.tl_header_two,
    },
    header3: {
      prefix: '### ',
      subfix: '',
      str: $vm.words.tl_header_three,
    },
    header4: {
      prefix: '#### ',
      subfix: '',
      str: $vm.words.tl_header_four,
    },
    header5: {
      prefix: '##### ',
      subfix: '',
      str: $vm.words.tl_header_five,
    },
    header6: {
      prefix: '###### ',
      subfix: '',
      str: $vm.words.tl_header_six,
    },
    underline: {
      prefix: '++',
      subfix: '++',
      str: $vm.words.tl_underline,
    },
    strikethrough: {
      prefix: '~~',
      subfix: '~~',
      str: $vm.words.tl_strikethrough,
    },
    mark: {
      prefix: '==',
      subfix: '==',
      str: $vm.words.tl_mark,
    },
    superscript: {
      prefix: '^',
      subfix: '^',
      str: $vm.words.tl_superscript,
    },
    subscript: {
      prefix: '~',
      subfix: '~',
      str: $vm.words.tl_subscript,
    },
    quote: {
      prefix: '> ',
      subfix: '',
      str: $vm.words.tl_quote,
    },
    link: {
      prefix: '[](',
      subfix: ')',
      str: $vm.words.tl_link,
    },
    imagelink: {
      prefix: '![](',
      subfix: ')',
      str: $vm.words.tl_image,
    },
    code: {
      prefix: '```',
      subfix: '\n\n```\n',
      str: 'language',
    },
    table: {
      prefix: '',
      subfix: '',
      str: '|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n',
    },
    aligncenter: {
      prefix: '::: hljs-center\n\n',
      subfix: '\n\n:::\n',
      str: $vm.words.tl_aligncenter,
    },
    alignright: {
      prefix: '::: hljs-right\n\n',
      subfix: '\n\n:::\n',
      str: $vm.words.tl_alignright,
    },
    alignleft: {
      prefix: '::: hljs-left\n\n',
      subfix: '\n\n:::\n',
      str: $vm.words.tl_alignleft,
    },
  };

  if (Object.hasOwnProperty.call(paramOfInsertText, type)) {
    // 插入对应的内容
    $vm.insertText($vm.getTextareaDom(), paramOfInsertText[type]);
  }

  const otherLeftClick = {
    undo: $ToolbarLeftUndoClick,
    redo: $ToolbarLeftRedoClick,
    trash: $ToolbarLeftTrashClick,
    save: $ToolbarLeftSaveClick,
    ol: $ToolbarLeftOlClick,
    ul: $ToolbarLeftUlClick,
    removeLine: $ToolbarLeftRemoveLineClick,
  };

  if (Object.hasOwnProperty.call(otherLeftClick, type)) {
    otherLeftClick[type]($vm);
  }
}
