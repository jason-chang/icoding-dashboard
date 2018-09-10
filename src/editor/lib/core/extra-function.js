/**
 * textarea 插入内容
 */

// 处理粗体与斜体冲突问题
function judgeItalicAndBold(prefix, subfix, tmpStr, startPos, endPos) {
  if (prefix === '*' && subfix === '*') {
    if (tmpStr.substring(startPos - 2, startPos - 1) === '*' && tmpStr.substring(endPos + 1, endPos + 2) === '*') {
      return false;
    }
  }
  return true;
}

export const insertTextAtCaret = (obj, {
  prefix, subfix, str, 
}, $vm) => {
  obj.focus();
  if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
    const startPos = obj.selectionStart;
    const endPos = obj.selectionEnd;
    const tmpStr = obj.value;
    if (startPos === endPos) {
      // 直接插入
      obj.value = tmpStr.substring(0, startPos) + prefix + str + subfix + tmpStr.substring(endPos, tmpStr.length);
      obj.selectionStart = startPos + prefix.length;
      obj.selectionEnd = startPos + (str.length + prefix.length);
    } else if (tmpStr.substring(startPos - prefix.length, startPos) === prefix
      && tmpStr.substring(endPos, endPos + subfix.length) === subfix
      && judgeItalicAndBold(prefix, subfix, tmpStr, startPos, endPos)) {
      // 存在选中区域
      // 取消
      obj.value = tmpStr.substring(0, startPos - prefix.length) + tmpStr.substring(startPos, endPos) + tmpStr.substring(endPos + subfix.length, tmpStr.length);
      obj.selectionStart = startPos - prefix.length;
      obj.selectionEnd = endPos - prefix.length;
    } else {
      // 确定
      obj.value = tmpStr.substring(0, startPos) + prefix + tmpStr.substring(startPos, endPos) + subfix + tmpStr.substring(endPos, tmpStr.length);
      obj.selectionStart = startPos + prefix.length;
      obj.selectionEnd = startPos + (endPos - startPos) + prefix.length;
    }

  } else {
    throw new Error('MarkdownError: Browser version is too low');
    // obj.value += str;
  }
  // 触发change事件
  $vm.localText = obj.value;
  obj.focus();
};

// 插入有序列表
export const insertOl = $vm => {
  const obj = $vm.getTextareaDom();
  if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
    const startPos = obj.selectionStart;
    const endPos = obj.selectionEnd;
    const tmpStr = obj.value;
    if (startPos === endPos) {
      // 直接插入
      obj.value = `${tmpStr.substring(0, startPos)}1. ${tmpStr.substring(endPos, tmpStr.length)}`;
      obj.selectionEnd = obj.selectionStart = startPos + 3;
    } else {
      // 存在选中区域
      let start = startPos;
      while (start > 0 && tmpStr.substring(start - 1, start) !== '\n') {
        start--;
      }
      const selectStr = tmpStr.substring(start, endPos);
      const selectStrs = selectStr.split('\n');
      for (let i = 0; i < selectStrs.length; i++) {
        selectStrs[i] = `${i + 1}. ${selectStrs[i]}`;
      }
      const newSelectStr = selectStrs.join('\n');
      obj.value = tmpStr.substring(0, start) + newSelectStr + tmpStr.substring(endPos, tmpStr.length);
      obj.selectionStart = start;
      obj.selectionEnd = (endPos + newSelectStr.length) - selectStr.length;
    }
  } else {
    throw new Error('MarkdownError: Browser version is too low');
  }
  // 触发change事件
  $vm.localText = obj.value;
  obj.focus();
};
// 删除行
export const removeLine = $vm => {
  const obj = $vm.getTextareaDom();
  if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
    const startPos = obj.selectionStart;
    const endPos = obj.selectionEnd;
    const tmpStr = obj.value;
    // 找到行首、行尾
    let start = startPos;
    while (start > 0 && tmpStr.substring(start - 1, start) !== '\n') {
      start--;
    }
    let end = endPos;
    while (end < tmpStr.length && tmpStr.substring(end, end + 1) !== '\n') {
      end++;
    }
    if (end < tmpStr.length) {
      end++;
    }
    obj.value = tmpStr.substring(0, start) + tmpStr.substring(end, tmpStr.length);
    obj.selectionEnd = obj.selectionStart = start === 0 ? 0 : start - 1;
  } else {
    throw new Error('MarkdownError: Browser version is too low');
    // obj.value += str;
  }
  // 触发change事件
  $vm.localText = obj.value;
  obj.focus();
};
// 插入无序列表
export const insertUl = $vm => {
  const obj = $vm.getTextareaDom();
  if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
    const startPos = obj.selectionStart;
    const endPos = obj.selectionEnd;
    const tmpStr = obj.value;
    if (startPos === endPos) {
      // 直接插入
      obj.value = `${tmpStr.substring(0, startPos)}- ${tmpStr.substring(endPos, tmpStr.length)}`;
      obj.selectionEnd = obj.selectionStart = startPos + 2;
    } else {
      // 存在选中区域
      let start = startPos;
      while (start > 0 && tmpStr.substring(start - 1, start) !== '\n') {
        start--;
      }
      const selectStr = tmpStr.substring(start, endPos);
      let newSelectStr = selectStr.replace(/\n/g, '\n- ');
      newSelectStr = `- ${newSelectStr}`;
      obj.value = tmpStr.substring(0, start) + newSelectStr + tmpStr.substring(endPos, tmpStr.length);
      obj.selectionStart = start;
      obj.selectionEnd = (endPos + newSelectStr.length) - selectStr.length;
    }
  } else {
    throw new Error('MarkdownError: Browser version is too low');
    // obj.value += str;
  }
  // 触发change事件
  $vm.localText = obj.value;
  obj.focus();
};
// 插入tab
export const insertTab = $vm => {
  const obj = $vm.getTextareaDom();
  if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
    const startPos = obj.selectionStart;
    const endPos = obj.selectionEnd;
    const tmpStr = obj.value;
    const lastLine = tmpStr.substring(0, startPos).split('\n').pop();
    if (lastLine.match(/^\s*[0-9]+\.\s+\S*/)) {
      // 有序列表
      const temp = lastLine.replace(/(\d+)/, 1);
      obj.value = `${tmpStr.substring(0, startPos - temp.length)}\t${temp}${tmpStr.substring(endPos, tmpStr.length)}`;
    } else if (lastLine.match(/^\s*-\s+\S*/)) {
      // 无序列表
      obj.value = `${tmpStr.substring(0, startPos - lastLine.length)}\t${lastLine}${tmpStr.substring(endPos, tmpStr.length)}`;
    } else {
      obj.value = `${tmpStr.substring(0, startPos)}\t${tmpStr.substring(endPos, tmpStr.length)}`;
    }
    obj.selectionStart = obj.selectionEnd = startPos + 1;
  } else {
    throw new Error('MarkdownError: Browser version is too low');
    // obj.value += str;
  }
  // 触发change事件
  $vm.localText = obj.value;
  obj.focus();
};
// shift + tab
export const unInsertTab = $vm => {
  const obj = $vm.getTextareaDom();
  if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
    const startPos = obj.selectionStart;
    const endPos = obj.selectionEnd;
    const tmpStr = obj.value;
    const lastLine = tmpStr.substring(0, startPos).split('\n').pop();
    if (lastLine.search(/\t/) >= 0) {
      // 替换最后一个制表符为空
      obj.value = tmpStr.substring(0, startPos - lastLine.length) + lastLine.replace(/(.*)\t/, '$1') + tmpStr.substring(endPos, tmpStr.length);
      obj.selectionStart = obj.selectionEnd = startPos - 1;
    }
  } else {
    throw new Error('MarkdownError: Browser version is too low');
    // obj.value += str;
  }
  // 触发change事件
  $vm.localText = obj.value;
  obj.focus();
};
// 插入enter
export const insertEnter = ($vm, event) => {
  const obj = $vm.getTextareaDom();
  if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
    const startPos = obj.selectionStart;
    const endPos = obj.selectionEnd;
    const tmpStr = obj.value;
    // 获取光标前最后一行字符串
    const lastLine = tmpStr.substring(0, startPos).split('\n').pop();
    const matchListNeedChangeLine = lastLine.match(/^\s*(?:[0-9]+\.|-)\s+\S+/);
    if (matchListNeedChangeLine) {
      // 需要自动产生下一个列表项
      event.preventDefault();
      // eg: [1.  test] 仅获取[1. ]
      const subfix = matchListNeedChangeLine.shift().match(/^\s*(?:[0-9]+\.|-)\s/).shift();
      if (subfix.search(/-/) >= 0) {
        // 无序列表
        obj.value = `${tmpStr.substring(0, startPos)}\n${subfix}${tmpStr.substring(endPos, tmpStr.length)}`;
        obj.selectionStart = obj.selectionEnd = startPos + subfix.length + 1;
      } else {
        // 有序列表
        const temp = subfix.replace(/(\d+)/, parseInt(subfix, 10) + 1);
        obj.value = `${tmpStr.substring(0, startPos)}\n${temp}${tmpStr.substring(endPos, tmpStr.length)}`;
        obj.selectionStart = obj.selectionEnd = startPos + temp.length + 1;
      }
    } else {
      const matchListNeedRemoveLine = lastLine.match(/^\s*(?:[0-9]+\.|-)\s+$/);
      if (matchListNeedRemoveLine) {
        // 需要跳出列表
        event.preventDefault();
        const preLength = matchListNeedRemoveLine.shift().length;
        obj.value = `${tmpStr.substring(0, startPos - preLength)}\n${tmpStr.substring(endPos, tmpStr.length)}`;
        obj.selectionStart = obj.selectionEnd = startPos - preLength;
        // TODO 检测是否存在嵌套列表，自动生成上一级
      }
    }
  } else {
    throw new Error('MarkdownError: Browser version is too low');
  }
  $vm.localText = obj.value;
  obj.focus();
};
/**
 * 生成导航目录
 */
export function getNavigation($vm) {
  const navigationContent = $vm.$refs.navigationContent;

  navigationContent.innerHTML = $vm.previewText;
  const nodes = navigationContent.children;

  function judageH(node, i) {
    const reg = /^H[1-6]$/;
    if (!reg.exec(node.tagName)) {
      node.style.display = 'none';
    } else {
      node.onclick = () => {
        const vShowContent = $vm.$refs.vShowContent;
        const vNoteEdit = $vm.$refs.vNoteEdit;
        if ($vm.subfield) {
          // 双栏
          if ($vm.s_preview_switch) {
            // 编辑预览
            vNoteEdit.scrollTop = (vShowContent.children[i].offsetTop * (vNoteEdit.scrollHeight - vNoteEdit.offsetHeight)) / (vShowContent.scrollHeight - vShowContent.offsetHeight);
          } else {
            // todo 编辑
          }
        } else if ($vm.s_preview_switch) {
          // 单栏
          // 预览
          vShowContent.scrollTop = vShowContent.children[i].offsetTop;
        } else {
          // todo 编辑
        }

      };
    }
  }

  if (nodes.length) {
    for (let i = 0; i < nodes.length; i++) {
      judageH(nodes[i], i, nodes);
    }
  }
}

/**
 * 滚动条联动
 */
export const scrollLink = ($event, $vm) => {
  const element = $event.srcElement ? $event.srcElement : $event.target;
  let ratio = element.scrollTop / (element.scrollHeight - element.offsetHeight);
  if ($vm.edit_scroll_height >= 0 && element.scrollHeight !== $vm.edit_scroll_height && (element.scrollHeight - element.offsetHeight - element.scrollTop <= 30)) {
    // star 内容变化 导致 高度增加  且滚动条距离底部小于25px  自动滚动到底部
    $vm.$refs.vNoteEdit.scrollTop = element.scrollHeight - element.offsetHeight;
    ratio = 1;
  }
  $vm.edit_scroll_height = element.scrollHeight;
  // end ----
  if ($vm.$refs.vShowContent.scrollHeight > $vm.$refs.vShowContent.offsetHeight) {
    $vm.$refs.vShowContent.scrollTop = ($vm.$refs.vShowContent.scrollHeight - $vm.$refs.vShowContent.offsetHeight) * ratio;
  }
};

/**
 * 监听浏览器fullscreen
 * @param $vm
 */
export const fullscreenchange = $vm => {
  // 阅读模式 全屏监听事件
  $vm.$el.addEventListener('fullscreenchange', () => $vm.$toolbar_right_read_change_status(), false);
  $vm.$el.addEventListener('mozfullscreenchange', () => $vm.$toolbar_right_read_change_status(), false);
  $vm.$el.addEventListener('webkitfullscreenchange', () => $vm.$toolbar_right_read_change_status(), false);
  $vm.$el.addEventListener('msfullscreenchange', () => $vm.$toolbar_right_read_change_status(), false);
};

/**
 * 监听浏览器onresize
 * @param $vm
 */
export const windowResize = $vm => {
  function sizeToStatus() {
    if ($vm.$el.clientWidth > 768) {
      // > 768
      $vm.subfield = $vm.subfield;
    } else {
      // <  768
      $vm.subfield = false;
    }
  }

  sizeToStatus();
  window.addEventListener('resize', sizeToStatus);
};


export const ImagePreviewListener = $vm => {
  // vShowContent
  $vm.$refs.vShowContent.addEventListener('click', event => {
    event = event || window.event;
    const ele = event.srcElement ? event.srcElement : event.target;
    if (ele.tagName === 'IMG') {
      if ($vm.imageClick) {
        // 覆盖图片点击事件
        $vm.imageClick(ele);
      } else {
        $vm.d_preview_imgsrc = ele.src;
      }
    }
  });
};
