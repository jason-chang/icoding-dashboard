
import Editor from './Editor';

// -------------------- 修改默认设置 --------------------
export function setDefault() {

}

// -------------------- 组件导出 --------------------
export default {
  markdownIt: Editor.mixins[0].data().markdownIt,
  editor: Editor,
  install(Vue) {
    Vue.component(Editor.name, Editor);
  },
};
