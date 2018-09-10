<template>
  <div :class="[{'fullscreen': s_fullScreen}]" class="markdown-editor-wrap markdown-body" @paste="$paste" @drop="$drag">

    <!-- 工具栏 -->
    <div class="markdown-editor-op" v-show="toolbarsFlag" :class="{'shadow': boxShadow}">
      <toolbar-left ref="toolbarLeft" :editable="editable" :words="words"
                         @toolbar_left_click="toolbarLeftClick" @toolbar_left_addlink="toolbarLeftAddlink" :toolbars="toolbars"
                         @imgAdd="$imgAdd" @imgDel="$imgDel" @imgTouch="$imgTouch" :image_filter="imageFilter"/>
      <toolbar-right ref="toolbarRight" :words="words" :toolbars="toolbars" :subfield="subfield"
                          :s_preview_switch="s_preview_switch" :s_fullScreen="s_fullScreen" :s_html_code="s_html_code" :navigation="showNavigation"/>
    </div>

    <!-- 编辑展示区域 -->
    <div class="markdown-editor-panel" :class="{'shadow': boxShadow}">

      <!-- 编辑区 -->
      <div ref="vNoteEdit" @scroll="$v_edit_scroll" class="markdown-editor-edit divarea-wrapper"
           :class="{'scroll-style': scrollStyle  , 'single-edit': !s_preview_switch && !s_html_code , 'single-show': (!subfield && s_preview_switch) || (!subfield && s_html_code)}"
           @click="textAreaFocus">
        <div class="content-input-wrapper">
          <!-- 双栏 -->
          <div :style="{fontSize: fontSize}" class="textarea-wrapper">
            <pre :style="{fontSize: fontSize}" class="textarea-block"><br/>{{localText}}</pre>
            <textarea ref="vTextarea" spellcheck="false" :autofocus="autofocus" :placeholder="placeholder ? placeholder : words.start_editor" :style="{fontSize: fontSize}"
                      v-model="localText" @keyup="change" class="textarea-input no-border no-resize"></textarea>
          </div>
        </div>
      </div>

      <!-- 预览区 -->
      <div :class="{'single-show': (!subfield && s_preview_switch) || (!subfield && s_html_code)}"
           v-show="s_preview_switch || s_html_code" class="markdown-editor-show">
        <div ref="vShowContent" v-html="previewText" v-show="!s_html_code"
             :class="{'scroll-style': scrollStyle}" class="v-show-content">
        </div>
        <div v-show="s_html_code" :class="{'scroll-style': scrollStyle}" class="v-show-content-html">
          {{ previewText }}
        </div>
      </div>

      <!-- 标题导航 -->
      <transition name="slideTop">
        <div v-show="showNavigation" class="markdown-editor-navigation-wrapper" :class="{'shadow': boxShadow}">
          <div class="markdown-editor-navigation-title" :class="{'shadow': boxShadow}">
            {{ words.navigation_title }}
            <i class="fa fa-mavon-times markdown-editor-navigation-close" aria-hidden="true"
               @click="$refs.toolbarRight.navigationClick()"></i>
          </div>
          <div ref="navigationContent" class="markdown-editor-navigation-content scroll-style">
          </div>
        </div>
      </transition>
    </div>

    <!-- 帮助文档 -->
    <transition name="fade">
      <div ref="help">
        <div @click="$refs.toolbarRight.helpClick()" class="markdown-editor-help-wrapper" v-if="s_help">
          <div @click.stop="" class="markdown-editor-help-content markdown-body" :class="{'shadow': boxShadow}">
            <i @click.stop.prevent="$refs.toolbarRight.helpClick()" class="fa fa-mavon-times"
               aria-hidden="true"></i>
            <div class="scroll-style markdown-editor-help-show" v-html="help"></div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 预览图片 -->
    <transition name="fade">
      <div @click="d_preview_imgsrc=null" class="markdown-editor-img-wrapper" v-if="d_preview_imgsrc">
        <img :src="d_preview_imgsrc" alt="none">
      </div>
    </transition>

    <!-- 阅读模式 -->
    <div :class="{'show': s_readmodel}" class="markdown-editor-read-model scroll-style" ref="vReadModel">
      <div ref="vNoteReadContent" class="markdown-editor-read-content" v-html="previewText">
      </div>
    </div>

  </div>
</template>

<style lang="scss">
  /*@import "lib/css/scroll.scss"*/
  @import "lib/style/mavon-editor.scss";
</style>

<script>
  /* eslint no-useless-escape: 0, no-console: 0 */

  import './lib/font/css/fontello.css';
  import './lib/style/md.css';

  import { setKeydownTarget } from './lib/core/keydownHub.js';

  import {
    fullscreenchange,
    scrollLink,
    insertTextAtCaret,
    getNavigation,
    insertTab,
    unInsertTab,
    insertOl,
    insertUl,
    insertEnter,
    removeLine,
    ImagePreviewListener,
  } from './lib/core/extra-function.js';

  // import { p_ObjectCopy_DEEP, stopEvent } from './lib/util.js';
  import { toolbarLeftClick, toolbarLeftAddlink } from './lib/toolbarLeftClick.js';

  import i18n from './lib/i18n/index.js';

  // import hljs from './lib/core/highlight.js';
  import markdown from './lib/mixins/markdown.js';

  import ToolbarLeft from './components/EditorToolbarLeft.vue';
  import ToolbarRight from './components/EditorToolbarRight.vue';

  import { stopEvent } from './lib/util';

  const toolbar = {
    bold: true,
    italic: true,
    header: true,
    underline: true,
    strikethrough: true,
    mark: true,
    superscript: true,
    subscript: true,
    quote: true,
    ol: true,
    ul: true,
    link: true,
    imagelink: true,
    code: true,
    table: true,
    undo: true,
    redo: true,
    trash: true,
    save: true,
    alignleft: true,
    aligncenter: true,
    alignright: true,
    navigation: true,
    subfield: true,
    fullscreen: true,
    readmodel: true,
    htmlcode: true,
    help: true,
    preview: true,
  };

  export default {
    name: 'MarkdownEditor',
    mixins: [markdown],
    props: { // 是否渲染滚动条样式(webkit)
      scrollStyle: {
        type: Boolean,
        default: true,
      },
      boxShadow: {
        type: Boolean,
        default: true,
      },
      fontSize: {
        type: String,
        default: '15px',
      },
      // 初始value
      value: {
        type: String,
        default: '',
      },
      i18n: {
        type: String,
        default: 'zhCN',
      },
      subfield: {
        type: Boolean,
        default: false,
      },
      navigation: {
        type: Boolean,
        default: false,
      },
      defaultOpen: {
        type: String,
        default: null,
      },
      // 是否开启编辑
      editable: {
        type: Boolean,
        default: true,
      },
      // 是否开启工具栏
      toolbarsFlag: {
        type: Boolean,
        default: true,
      },
      // 工具栏
      toolbars: {
        type: Object,
        default() {
          return toolbar;
        },
      },
      placeholder: {
        type: String,
        default: null,
      },
      imageFilter: {
        type: Function,
        default: null,
      },
      imageClick: {
        type: Function,
        default: null,
      },
    },
    data() {

      let defaultOpen = this.defaultOpen;

      if (!defaultOpen) {
        defaultOpen = this.subfield ? 'preview' : 'edit';
      }

      return {
        // 编辑器文本值
        localText: this.value,
        // 渲染后的 markdown 文本
        previewText: '',
        // 编辑器自动获取焦点
        autofocus: true,
        // 是否显示导航视图
        showNavigation: this.navigation,
        s_preview_switch: defaultOpen === 'preview', // props true 展示编辑 false展示预览
        s_fullScreen: false, // 全屏编辑标志
        s_help: false, // markdown帮助
        s_html_code: false, // 分栏情况下查看html
        edit_scroll_height: -1,
        s_readmodel: false,
        s_table_enter: false, // 回车事件是否在表格中执行
        d_history: [this.value], // 编辑记录
        d_history_index: 0, // 编辑记录索引
        currentTimeout: '',
        d_image_file: [],
        d_preview_imgsrc: null, // 图片预览地址

        // i18n help & words
        help: null,
        words: null,
      };
    },
    created() {
      // 初始化语言
      this.setI18n();
      this.$nextTick(() => {
        // 初始化Textarea编辑开关
        this.editableTextarea();
      });
    },
    mounted() {
      // 监听 keyDown 事件
      setKeydownTarget(this);
      // 图片预览事件监听
      ImagePreviewListener(this);
      // fullscreen事件
      fullscreenchange(this);
      // 将help添加到末尾
      document.body.appendChild(this.$refs.help);
    },
    beforeDestroy() {
      document.body.removeChild(this.$refs.help);
    },
    methods: {
      textAreaFocus() {
        this.$refs.vTextarea.focus();
      },
      $drag($e) {
        const dataTransfer = $e.dataTransfer;
        if (dataTransfer) {
          const files = dataTransfer.files;
          if (files.length > 0) {
            $e.preventDefault();
            this.$refs.toolbarLeft.$imgFilesAdd(files);
          }
        }
      },
      $paste($e) {
        const clipboardData = $e.clipboardData;
        if (clipboardData) {
          const items = clipboardData.items;
          if (!items) return;
          const types = clipboardData.types || [];
          let item = null;
          for (let i = 0; i < types.length; i++) {
            if (types[i] === 'Files') {
              item = items[i];
              break;
            }
          }
          if (item && item.kind === 'file') {
            // prevent filename being pasted parallel along
            // with the image pasting process
            stopEvent($e);
            const oFile = item.getAsFile();
            this.$refs.toolbarLeft.$imgFilesAdd([oFile]);
          }
        }
      },
      $imgTouch() {
        // TODO 跳转到图片位置
      },
      $imgDel(file) {
        this.markdownIt.image_del(file[0]);
        // 删除所有markdown中的图片
        const fileReg = file[1];
        const reg = new RegExp(`\\!\\[${file[0].name}\\]\\(${fileReg}\\)`, 'g');

        this.localText = this.localText.replace(reg, '');
        this.iRender();
        this.$emit('imgDel', file);
      },
      $imgAdd(pos, $file, isinsert) {
        if (isinsert === undefined) isinsert = true;
        const $vm = this;
        if (this.rFilter === null) {
          this.rFilter = /^image\//i;
        }

        this.oFReader = new FileReader();
        this.oFReader.onload = oFREvent => {
          $vm.markdownIt.image_add(pos, oFREvent.target.result);
          $file.miniurl = oFREvent.target.result;
          if (isinsert === true) {
            // 去除特殊字符
            $file.name = $file.name.replace(/[[]\(\)\+{}&|\\\*^%$#@-]/g, '');
            $vm.insertText(
              $vm.getTextareaDom(),
              {
                prefix: `![${$file.name}](${pos})`,
                subfix: '',
                str: '',
              },
            );
            $vm.$nextTick(() => {
              $vm.$emit('imgAdd', pos, $file);
            });
          }
        };
        if ($file) {
          const oFile = $file;
          if (this.rFilter.test(oFile.type)) {
            this.oFReader.readAsDataURL(oFile);
          }
        }
      },
      $imgUpdateByUrl(pos, url) {
        const $vm = this;
        this.markdownIt.image_add(pos, url);
        this.$nextTick(() => {
          $vm.previewText = this.markdownIt.render(this.localText);
        });
      },
      $imgAddByUrl(pos, url) {
        if (this.$refs.toolbarLeft.$imgAddByUrl(pos, url)) {
          this.$imgUpdateByUrl(pos, url);
          return true;
        }
        return false;
      },
      $img2Url(fileIndex, url) {
        const reg = new RegExp(`(!\\[\[^\\[\]*?\\]\(?=\\(\)\)\\(\\s*\(${fileIndex}\)\\s*\\)`, 'g');
        this.localText = this.localText.replace(reg, `$1(${url})`);
        this.$refs.toolbarLeft.$changeUrl(fileIndex, url);
        this.iRender();
      },
      $imglst2Url(imglst) {
        if (imglst instanceof Array) {
          for (let i = 0; i < imglst.length; i++) {
            this.$img2Url(imglst[i][0], imglst[i][1]);
          }
        }
      },
      toolbarLeftClick(_type) {
        toolbarLeftClick(_type, this);
      },
      toolbarLeftAddlink(_type, text, link) {
        toolbarLeftAddlink(_type, text, link, this);
      },
      getNavigation($vm, full) {
        return getNavigation($vm, full);
      },
      // @event
      // 修改数据触发 （val ， val_render）
      change(val, render) {
        this.$emit('change', val, render);
      },
      // 切换全屏触发 （status , val）
      fullscreen(status, val) {
        this.$emit('fullScreen', status, val);
      },
      // 打开阅读模式触发（status , val）
      readmodel(status, val) {
        this.$emit('readModel', status, val);
      },
      // 切换阅读编辑触发 （status , val）
      previewtoggle(status, val) {
        this.$emit('previewToggle', status, val);
      },
      // 切换分栏触发 （status , val）
      subfieldtoggle(status, val) {
        this.$emit('subfieldToggle', status, val);
      },
      // 切换htmlcode触发 （status , val）
      htmlcode(status, val) {
        this.$emit('htmlCode', status, val);
      },
      // 打开 , 关闭 help触发 （status , val）
      helptoggle(status, val) {
        this.$emit('helpToggle', status, val);
      },
      // 监听ctrl + s
      save(val, render) {
        this.$emit('save', val, render);
      },
      $toolbar_right_read_change_status() {
        this.s_readmodel = !this.s_readmodel;
        if (this.readmodel) {
          this.readmodel(this.s_readmodel, this.localText);
        }
        if (this.s_readmodel && this.toolbars.navigation) {
          this.getNavigation(this, true);
        }
      },
      // ---------------------------------------
      // 滚动条联动
      $v_edit_scroll($event) {
        scrollLink($event, this);
      },
      // 获取textarea dom节点
      getTextareaDom() {
        return this.$refs.vTextarea;
      },
      // 工具栏插入内容
      insertText(obj, {
        prefix, subfix, str, type,
      }) {
        // if (this.s_preview_switch) {
        insertTextAtCaret(obj, {
          prefix, subfix, str, type, 
        }, this);
      },
      insertTab() {
        insertTab(this);
      },
      insertOl() {
        insertOl(this);
      },
      removeLine() {
        removeLine(this);
      },
      insertUl() {
        insertUl(this);
      },
      unInsertTab() {
        unInsertTab(this);
      },
      insertEnter(event) {
        insertEnter(this, event);
      },
      saveHistory() {
        this.d_history.splice(this.d_history_index + 1, this.d_history.length);
        this.d_history.push(this.localText);
        this.d_history_index = this.d_history.length - 1;
      },
      // Set language of user interface
      setI18n() {
        this.$render(i18n.helps[this.i18n], res => {
          this.help = res;
        });

        this.words = i18n.words[this.i18n];
      },
      // 编辑开关
      editableTextarea() {
        const textDom = this.$refs.vTextarea;
        if (this.editable) {
          textDom.removeAttribute('disabled');
        } else {
          textDom.setAttribute('disabled', 'disabled');
        }
      },
      iRender() {
        const $vm = this;
        $vm.$render($vm.localText, res => {
        // render
          $vm.previewText = res;
          // change回调
          if ($vm.change) $vm.change($vm.localText, $vm.previewText);
          // 改变标题导航
          if ($vm.navigation) getNavigation($vm, false);
          // v-model 语法糖
          $vm.$emit('input', $vm.localText);
          // 塞入编辑记录数组
          if ($vm.localText === $vm.d_history[$vm.d_history_index]) return;
          window.clearTimeout($vm.currentTimeout);
          $vm.currentTimeout = setTimeout(() => {
            $vm.saveHistory();
          }, 500);
        });
      },
      // 清空上一步 下一步缓存
      $emptyHistory() {
        this.d_history = [this.localText]; // 编辑记录
        this.d_history_index = 0; // 编辑记录索引
      },
      getMarkdownIt() {
        return this.mixins[0].data().markdownIt;
      },
    },
    watch: {
      localText(val) {
        this.iRender(val);
      },
      value(val) {
        if (val !== this.localText) {
          this.localText = val;
        }
      },
      subfield(val) {
        this.subfield = val;
      },
      d_history_index() {
        if (this.d_history_index > 20) {
          this.d_history.shift();
          this.d_history_index = this.d_history_index - 1;
        }
        this.localText = this.d_history[this.d_history_index];
      },
      i18n() {
        this.setI18n();
      },
      editable() {
        this.editableTextarea();
      },
      defaultOpen(val) {
        let defaultOpen = val;

        if (!defaultOpen) {
          defaultOpen = this.subfield ? 'preview' : 'edit';
        }

        this.s_preview_switch = defaultOpen === 'preview';

        return this.s_preview_switch;
      },
    },
    components: {
      ToolbarLeft,
      ToolbarRight,
    },
  };
</script>
