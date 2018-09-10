
let eventTarget;

const keyCodeList = {
  B: 66,
  I: 73,
  H: 72,
  U: 85,
  D: 68,
  M: 77,
  Q: 81,
  O: 79,
  L: 76,
  S: 83,
  Z: 90,
  Y: 89,
  C: 67,
  T: 84,
  R: 82,
  DELETE: 8,
  TAB: 9,
  ENTER: 13,
  ONE: 97,
  TWO: 98,
  THREE: 99,
  FOUR: 100,
  FIVE: 101,
  SIX: 102,
  NUM1: 49,
  NUM2: 50,
  NUM3: 51,
  NUM4: 52,
  NUM5: 53,
  NUM6: 54,
};

const eventHub = {};

export function keydownHub($vm) {
  $vm.$el.addEventListener('keydown', e => {
    // 注册监听键盘事件
    if (!(e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
      // one key
      switch (e.keyCode) {
        case keyCodeList.F8: {
          // F8 导航
          if ($vm.toolbars.navigation) {
            e.preventDefault();
            $vm.toolbarRightClick('navigation');
          }
          break;
        }
        case keyCodeList.F9: {
          // F9 预览模式
          if ($vm.toolbars.preview) {
            e.preventDefault();
            $vm.toolbarRightClick('preview');
          }
          break;
        }
        case keyCodeList.F10: {
          // F10 全屏
          if ($vm.toolbars.fullscreen) {
            e.preventDefault();
            $vm.toolbarRightClick('fullscreen');
          }
          break;
        }
        case keyCodeList.F11: {
          // F11 阅读
          if ($vm.toolbars.readmodel) {
            e.preventDefault();
            $vm.toolbarRightClick('read');
          }
          break;
        }
        case keyCodeList.F12: {
          // F12 单双栏切换
          if ($vm.toolbars.subfield) {
            e.preventDefault();
            $vm.toolbarRightClick('subfield');
          }
          break;
        }
        case keyCodeList.TAB: {
          // TAB
          if (!$vm.$refs.toolbarLeft.s_img_link_open) {
            e.preventDefault();
            $vm.insertTab();
          }
          break;
        }
        case keyCodeList.ENTER: {
          // enter
          if ($vm.$refs.toolbarLeft.s_img_link_open) {
            // 当添加外部链接的弹出层打开时， enter表示确定输入此链接
            e.preventDefault();
            $vm.$refs.toolbarLeft.$imgLinkAdd();
          } else {
            // 在文本框中输入enter
            $vm.insertEnter(e);
          }
          break;
        }
        default:
          break;
      }
    } else if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
      // ctrl +
      switch (e.keyCode) {
        case keyCodeList.B: {
          // B
          e.preventDefault();
          $vm.toolbarLeftClick('bold');
          break;
        }
        case keyCodeList.I: {
          // I
          e.preventDefault();
          $vm.toolbarLeftClick('italic');
          break;
        }
        case keyCodeList.H: {
          // H
          e.preventDefault();
          $vm.toolbarLeftClick('header');
          break;
        }
        case keyCodeList.U: {
          // U
          e.preventDefault();
          $vm.toolbarLeftClick('underline');
          break;
        }
        case keyCodeList.D: {
          // D
          e.preventDefault();
          $vm.toolbarLeftClick('removeLine');
          break;
        }
        case keyCodeList.M: {
          // M
          e.preventDefault();
          $vm.toolbarLeftClick('mark');
          break;
        }
        case keyCodeList.Q: {
          // Q
          e.preventDefault();
          $vm.toolbarLeftClick('quote');
          break;
        }
        case keyCodeList.O: {
          // O
          e.preventDefault();
          $vm.toolbarLeftClick('ol');
          break;
        }
        case keyCodeList.L: {
          // L
          e.preventDefault();
          $vm.toolbarLeftClick('link');
          break;
        }
        case keyCodeList.S: {
          // S
          e.preventDefault();
          $vm.toolbarLeftClick('save');
          break;
        }
        case keyCodeList.Z: {
          // Z
          e.preventDefault();
          $vm.toolbarLeftClick('undo');
          break;
        }
        case keyCodeList.Y: {
          // Y
          e.preventDefault();
          $vm.toolbarLeftClick('redo');
          break;
        }
        case keyCodeList.DELETE: {
          // delete
          e.preventDefault();
          $vm.toolbarLeftClick('trash');
          break;
        }
        case keyCodeList.ONE: {
          // ONE
          e.preventDefault();
          $vm.toolbarLeftClick('header1');
          break;
        }
        case keyCodeList.TWO: {
          // TWO
          e.preventDefault();
          $vm.toolbarLeftClick('header2');
          break;
        }
        case keyCodeList.THREE: {
          // THREE
          e.preventDefault();
          $vm.toolbarLeftClick('header3');
          break;
        }
        case keyCodeList.FOUR: {
          // FOUR
          e.preventDefault();
          $vm.toolbarLeftClick('header4');
          break;
        }
        case keyCodeList.FIVE: {
          // FIVE
          e.preventDefault();
          $vm.toolbarLeftClick('header5');
          break;
        }
        case keyCodeList.SIX: {
          // SIX
          e.preventDefault();
          $vm.toolbarLeftClick('header6');
          break;
        }
        case keyCodeList.NUM1: {
          // ONE
          e.preventDefault();
          $vm.toolbarLeftClick('header1');
          break;
        }
        case keyCodeList.NUM2: {
          // TWO
          e.preventDefault();
          $vm.toolbarLeftClick('header2');
          break;
        }
        case keyCodeList.NUM3: {
          // THREE
          e.preventDefault();
          $vm.toolbarLeftClick('header3');
          break;
        }
        case keyCodeList.NUM4: {
          // FOUR
          e.preventDefault();
          $vm.toolbarLeftClick('header4');
          break;
        }
        case keyCodeList.NUM5: {
          // FIVE
          e.preventDefault();
          $vm.toolbarLeftClick('header5');
          break;
        }
        case keyCodeList.NUM6: {
          // SIX
          e.preventDefault();
          $vm.toolbarLeftClick('header6');
          break;
        }
        default:
          break;
      }
    } else if ((e.ctrlKey || e.metaKey) && e.altKey && !e.shiftKey) {
      // ctrl + alt +
      switch (e.keyCode) {
        case keyCodeList.S: {
          // S
          e.preventDefault();
          $vm.toolbarLeftClick('superscript');
          break;
        }
        case keyCodeList.U: {
          // U
          e.preventDefault();
          $vm.toolbarLeftClick('ul');
          break;
        }
        case keyCodeList.L: {
          // L
          e.preventDefault();
          $vm.toolbarLeftClick('imagelink');
          break;
        }
        case keyCodeList.C: {
          // C
          e.preventDefault();
          $vm.toolbarLeftClick('code');
          break;
        }
        case keyCodeList.T: {
          // T
          e.preventDefault();
          $vm.toolbarLeftClick('table');
          break;
        }
        default:
          break;
      }
    } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && !e.altKey) {
      // ctrl + shift
      switch (e.keyCode) {
        case keyCodeList.S: {
          // S
          e.preventDefault();
          $vm.toolbarLeftClick('subscript');
          break;
        }
        case keyCodeList.D: {
          // D
          e.preventDefault();
          $vm.toolbarLeftClick('strikethrough');
          break;
        }
        case keyCodeList.L: {
          // D
          e.preventDefault();
          $vm.toolbarLeftClick('alignleft');
          break;
        }
        case keyCodeList.R: {
          // D
          e.preventDefault();
          $vm.toolbarLeftClick('alignright');
          break;
        }
        case keyCodeList.C: {
          // D
          e.preventDefault();
          $vm.toolbarLeftClick('aligncenter');
          break;
        }
        default:
          break;
      }
    } else if (!(e.ctrlKey || e.metaKey) && e.shiftKey && !e.altKey) {
      // shift +
      switch (e.keyCode) {
        case keyCodeList.TAB: {
          // TAB
          if (!$vm.$refs.toolbarLeft.s_img_link_open) {
            e.preventDefault();
            $vm.unInsertTab();
          }
          break;
        }
        default:
          break;
      }
    }
  });
}

function handleEvent(event) {
  let handle = '';

  if (event.ctrlKey) {
    handle += 'Ctrl';
  }

  if (event.metaKey) {
    handle += 'Meta';
  }

  if (event.shiftKey) {
    handle += 'Shift';
  }

  if (event.altKey) {
    handle += 'Alt';
  }

  handle += event.keyCode;

  if (Object.hasOwnProperty.call(eventHub, handle)) {
    event.preventDefault();
    eventHub[handle](eventTarget);
  }
}

export function listenKeydown(key, cb) {
  let handle = '';

  if (key.ctrl) {
    handle += 'Ctrl';
  }

  if (key.command || key.win) {
    handle += 'Meta';
  }

  if (key.shift) {
    handle += 'Shift';
  }

  if (key.alt) {
    handle += 'Alt';
  }

  handle += key.keyCode;

  eventHub[handle] = cb;
}

export function setKeydownTarget(vm) {
  eventTarget = vm;
  eventTarget.$el.removeEventListener('keydown', handleEvent);
  eventTarget.$el.addEventListener('keydown', handleEvent);
}

export default {};
