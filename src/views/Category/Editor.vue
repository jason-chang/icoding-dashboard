<template>
  <div class="editor-wrap">
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
        entityType: '分类',
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