<template>
  <div class="editor-wrap">
    <el-card class="editor-card" style="width: 500px;" v-loading="editorLoading">
      <template slot="header">
        <h2>{{ $_editorTitle }}</h2>
        <el-button class="editor-card-close" type="text" @click="$_editorClose"><i class="el-icon-close"></i></el-button>
      </template>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" @submit.native.stop.prevent="$_editorHandleSubmit">
        <el-form-item label="角色名称:" prop="display_name">
          <el-input type="text" v-model="form.display_name"></el-input>
        </el-form-item>
        <el-form-item label="角色标识:" prop="name">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色简介:" prop="parents">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="角色权限:" prop="parents">
          <el-tree :data="permissionTree"  style="height: 500px; overflow: scroll;"
                   ref="tree" show-checkbox node-key="id" :default-checked-keys="treeChecked" :default-expanded-keys="treeChecked"  @check-change="handleCheckChange"></el-tree>
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
</style>

<script>
  import assign from 'lodash/assign';
  import clone from 'lodash/clone';
  import uniq from 'lodash/uniq';
  import editorMixin from '@/mixins/editor';

  function getAllIds(arr) {
    let allIds = [];

    const curIds = arr.map(item => {
      if (item.children) {
        allIds = allIds.concat(getAllIds(item.children));
      }

      return item.id;
    });

    allIds = allIds.concat(curIds);

    return allIds;
  }

  export default {
    mixins: [editorMixin],
    name: 'RoleEditorView',
    data() {
      return {
        entityType: '角色',
        apiData: 'dash_api.role.item',

        form: {
          name: '',
          display_name: '',
          description: '',
          permissions: [],
        },
        rules: {
          name: [
            { required: true, message: '请输入角色标示', trigger: 'blur' },
          ],
          display_name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
          ],
        },

        permissionTree: [],
        treeChecked: [],
      };
    },
    watch: {},
    computed: {},
    mounted() {
      this.$_editorLoadData();
    },
    methods: {
      dataFiller({ permissionTree, role }) {
        this.permissionTree = permissionTree;
        if (role) {
          assign(this.form, role);
          this.treeChecked = role.permissions;
        }
      },
      handleCheckChange(row, check) {
        let permissions = clone(this.form.permissions);
        const allIds = getAllIds([row]);
        if (check) {
          permissions = permissions.concat(allIds);
          this.form.permissions = uniq(permissions);
        } else {
          this.form.permissions = permissions.filter(item => allIds.indexOf(item) === -1);
        }
      },
    },
    components: {},
  };
</script>