
export default {
  computed: {
    $_dataListUserApiDel() {
      return this.apiDel ? this.apiDel : this.apiData.replace(/\.[\w\d]+$/, '.del');
    },
    $_dataListUserApiDisable() {
      return this.apiDel ? this.apiDel : this.apiData.replace(/\.[\w\d]+$/, '.disable');
    },
    $_dataListUserRouteCreate() {
      return this.routeCreate ? this.routeCreate : this.$route.name.replace(/\.[\w\d]+$/, '.create');
    },
  },
  methods: {
    $_dataListHandleEdit(index, row) {
      this.$router.push({
        name: this.$route.name.replace(/\.index$/, '.edit'),
        params: { id: row.id },
      });
    },
    async $_dataListHandleDelete(index, row) {
      this.submiting = true;
      const api = this.$_dataListUserApiDel;
      try {
        const apiUrl = $lib.helpers.route(api, { id: row.id });

        const { data: { status, message } } = await this.$http.post(apiUrl, this.form);

        if (status > 200) {
          this.$message({ message, type: 'error', duration: 5000 });
        } else {
          this.$message.success(`${this.entityType} 删除成功。`);
          this.$refs.dataFilter.reload();
        }

        this.submiting = false;
      } catch (e) {
        this.$message.error(`${this.$options.name} 组件错误: 向Api(${api})提交数据失败!`);
        this.submiting = false;
        throw e;
      }
    },
    async $_dataListHandleDisable(index, row) {
      this.submiting = true;
      const api = this.$_dataListUserApiDisable;
      try {
        const apiUrl = $lib.helpers.route(api, { id: row.id });
        console.info(apiUrl);

        const { data: { status, message } } = await this.$http.post(apiUrl, this.form);

        if (status > 200) {
          this.$message({ message, type: 'error', duration: 5000 });
        } else {
          this.$message.success(`${this.entityType} ${row.blocked_at ? '启用' : '禁用'}成功。`);
          this.$refs.dataFilter.reload();
        }

        this.submiting = false;
      } catch (e) {
        this.$message.error(`${this.$options.name} 组件错误: 向Api(${api})提交数据失败!`);
        this.submiting = false;
        throw e;
      }
    },
  },
};
