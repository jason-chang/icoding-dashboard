<template>
  <div class="permission-editor-view-wrap editor-wrap">
    <el-card class="editor-card" style="width: 500px;" v-loading="editorLoading">
      <template slot="header">
        <h2>{{ $_editorTitle }}</h2>
        <el-button class="editor-card-close" type="text" @click="$_editorClose"><i class="el-icon-close"></i></el-button>
      </template>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" @submit.native.stop.prevent="$_editorHandleSubmit">
        <el-form-item label="权限名称:" prop="display_name">
          <el-input type="text" v-model="form.display_name"></el-input>
        </el-form-item>
        <el-form-item label="权限标示:" prop="name">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="权限路由:" prop="route">
          <el-input type="text" v-model="form.route"></el-input>
        </el-form-item>
        <el-form-item label="所属菜单:" prop="parents">
          <el-cascader change-on-select :options="menuTree" v-model="form.parents"></el-cascader>
        </el-form-item>
        <el-form-item label="是否显示:" prop="type">
          <el-switch :active-value="1" :inactive-value="0" v-model="form.type"></el-switch>
        </el-form-item>
        <el-form-item label="图标:" prop="icon">
          <el-input type="text" v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-loading="editorSubmiting" type="primary" native-type="submit">确定</el-button>
          <el-button @click="$_editorClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
  .permission-editor-view-wrap {}
</style>

<script>
  import editorMixin from '@/mixins/editor';
  import assign from 'lodash/assign';

  export default {
    mixins: [editorMixin],
    name: 'PermissionEditorView',
    data() {
      return {
        entityType: '权限',
        apiData: 'dash_api.permission.item',

        form: {
          name: '',
          display_name: '',
          route: '',
          parents: [],
          type: 0,
          icon: '',
          description: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入权限标示', trigger: 'blur' },
          ],
          display_name: [
            { required: true, message: '请输入权限名称', trigger: 'blur' },
          ],
        },

        menuTree: [],
      };
    },
    watch: {},
    computed: {},
    mounted() {
      this.$_editorLoadData();
    },
    methods: {
      dataFiller({ menuTree, permission }) {
        this.menuTree = menuTree;
        if (permission) {
          assign(this.form, permission);
        }
      },
    },
    components: {},
  };
</script>