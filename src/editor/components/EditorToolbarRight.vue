<template>
  <div class="markdown-editor-toolbar-right">
    <button type="button" v-if="toolbars.navigation" @click="navigationClick" class="op-icon fa-mavon-bars" aria-hidden="true"
            :class="{selected: navigation}"
            :title="`${words.tl_navigation_off} (F8)`"></button>

    <button type="button" v-if="toolbars.preview" @click="previewClick" class="op-icon" aria-hidden="true"
            :class="{selected: navigation, 'fa-mavon-eye': !s_preview_switch, 'fa-mavon-eye-slash': s_preview_switch}"
            :title="(s_preview_switch ? words.tl_edit : words.tl_preview) + ' (F9)'"></button>

    <button type="button" v-if="toolbars.fullscreen" @click="fullscreenClick" class="op-icon" aria-hidden="true"
            :class="{selected: s_fullScreen, 'fa-mavon-arrows-alt': !s_fullScreen, 'fa-mavon-compress': s_fullScreen}"
            :title="(s_fullScreen ? words.tl_fullscreen_on : words.tl_fullscreen_off) + ' (F10)'"></button>

    <button type="button" v-if="toolbars.readmodel" @click="readClick" class="op-icon fa-mavon-window-maximize" aria-hidden="true"
            :title="`${words.tl_read} (F11)`"></button>

    <button type="button" v-if="toolbars.subfield" @click="subfieldClick" class="op-icon fa-mavon-columns" aria-hidden="true"
            :class="{'selected': subfield}" :title="`${subfield ? words.tl_single_column : words.tl_double_column} (F12)`"></button>

    <span v-if="toolbars.help && toolbars.htmlcode && toolbars.readmodel && toolbars.fullscreen && toolbars.subfield && toolbars.navigation"
      class="op-icon-divider"></span>

    <button type="button" v-if="toolbars.htmlcode" @click="htmlClick" class="op-icon fa-mavon-code" aria-hidden="true"
            :class="{selected: s_html_code}"
            :title="(s_html_code ? words.tl_html_off : words.tl_html_on )"></button>

    <button type="button"  v-if="toolbars.help" @click="helpClick" class="op-icon fa-mavon-question-circle" aria-hidden="true"
            style="font-size: 17px; padding: 5px 6px 5px 3px"
            :title="words.tl_help"></button>
  </div>
</template>

<script>
  import { listenKeydown } from '../lib/core/keydownHub';

  export default {
    name: 'MarkdownEditorToolbarRight',
    props: {
      // 工具栏
      subfield: {
        type: Boolean,
        required: true,
      },
      toolbars: {
        type: Object,
        required: true,
      },

      s_preview_switch: {
        type: Boolean,
        required: true,
      },
      s_fullScreen: {
        type: Boolean,
        required: true,
      },
      s_html_code: {
        type: Boolean,
        required: true,
      },

      navigation: {
        type: Boolean,
        required: true,
      },
      words: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      listenKeydown({ keyCode: 119 }, this.navigationClick);
      listenKeydown({ keyCode: 120 }, this.htmlClick);
      listenKeydown({ keyCode: 121 }, this.fullscreenClick);
      listenKeydown({ keyCode: 122 }, this.readClick);
      listenKeydown({ keyCode: 123 }, this.subfieldClick);
    },
    methods: {
      // 显示导航视图 F8 119
      navigationClick() {
        const $editor = this.$parent;
        $editor.showNavigation = !$editor.showNavigation;
        if ($editor.showNavigation) {
          $editor.s_preview_switch = true;
        }
        // 激活导航 switch 事件
        $editor.$emit('navigation-toggle', $editor.showNavigation, $editor.localText);

        if ($editor.showNavigation) {
          // 绘制标题导航
          $editor.getNavigation($editor, false);
        }
      },
      // 显示源码视图 F9: 120,
      htmlClick() {
        const $editor = this.$parent;
        $editor.s_html_code = !$editor.s_html_code;
        if ($editor.htmlcode) {
          $editor.htmlcode($editor.s_html_code, $editor.localText);
        }
      },
      // 激活网页全屏视图 F10: 121,
      fullscreenClick() {
        const $editor = this.$parent;
        $editor.s_fullScreen = !$editor.s_fullScreen;
        if ($editor.fullscreen) {
          $editor.fullscreen($editor.s_fullScreen, $editor.localText);
        }
      },
      // 显示全屏预览视图 F11: 122,
      readClick() {
        const $editor = this.$parent;
        const element = $editor.$refs.vReadModel;
        // 单栏编辑
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      },
      // 显示分栏视图 F12: 123
      subfieldClick() {
        const $editor = this.$parent;
        $editor.subfield = !$editor.subfield;
        $editor.s_preview_switch = $editor.subfield;
        // $editor.$refs.vNoteDivEdit.innerHTML = $editor.s_markdown.render($editor.localText)
        if ($editor.previewtoggle) {
          $editor.previewtoggle($editor.s_preview_switch, $editor.localText);
        }
        // $editor.$refs.vNoteDivEdit.innerHTML = $editor.s_markdown.render($editor.localText)
        if ($editor.subfieldtoggle) {
          $editor.subfieldtoggle($editor.subfield, $editor.localText);
        }
      },
      // 显示预览视图
      previewClick() {
        const $editor = this.$parent;
        $editor.s_preview_switch = !$editor.s_preview_switch;
        // $editor.$refs.vNoteDivEdit.innerHTML = $editor.s_markdown.render($editor.localText)
        if ($editor.previewtoggle) {
          $editor.previewtoggle($editor.s_preview_switch, $editor.localText);
        }
      },
      // 显示帮助视图
      helpClick() {
        const $editor = this.$parent;
        $editor.s_help = !$editor.s_help;
        if ($editor.helptoggle) {
          $editor.helptoggle($editor.s_help, $editor.localText);
        }
      },
    },
  };
</script>
