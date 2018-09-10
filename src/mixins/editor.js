import assign from 'lodash/assign';

export default {
  data() {
    return {
      editorLoading: false,
      editorSubmiting: false,
    };
  },
  computed: {
    $_editorIsCreateAction() {
      return /create$/.test(this.$route.name);
    },
    $_editorActionLable() {
      return this.$_editorIsCreateAction ? '添加' : '编辑';
    },
    $_editorTitle() {
      return this.$_editorActionLable + this.entityType;
    },
    $_editorUserApiStore() {
      return this.apiStore ? this.apiStore : this.apiData.replace(/\.[\w\d]+$/, '.store');
    },
    $_editorUserApiSave() {
      return this.apiSave ? this.apiSave : this.apiData.replace(/\.[\w\d]+$/, '.save');
    },
  },
  mounted() {
    document.addEventListener('keyup', this.$_handleEscape);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.$_handleEscape);
  },
  methods: {
    async $_editorLoadData() {
      this.editorLoading = true;
      try {
        const apiUrl = $lib.helpers.route(this.apiData, {
          id: this.$route.params.id ? this.$route.params.id : 0,
        });

        const { data: { data } } = await this.$http.get(apiUrl);

        if (typeof this.dataFiller === 'function') {
          this.dataFiller(data);
        } else {
          assign(this.form, data);
        }

        this.editorLoading = false;
      } catch (e) {
        this.$message.error(`${this.$options.name} 组件错误: 从Api(${this.apiData})获取数据失败!`);
        this.editorLoading = false;
        throw e;
      }
    },
    $_editorHandleSubmit() {
      this.$refs.form.validate(valid => valid && this.$_editorSubmitToApi());
    },
    async $_editorSubmitToApi() {
      this.editorSubmiting = true;
      const api = this.$_editorIsCreateAction ? this.$_editorUserApiStore : this.$_editorUserApiSave;
      try {

        const apiUrl = $lib.helpers.route(api, {
          id: this.$route.params.id ? this.$route.params.id : 0,
        });

        const { data: { status, message } } = await this.$http.post(apiUrl, this.form);

        if (status > 200) {
          this.$message({ message, type: 'error', duration: 5000 });
        } else {
          this.$message.success(`${this.entityType}${this.$_editorIsCreateAction ? '创建' : '编辑'}成功。`);
          this.$_editorClose();
          this.$parent.$refs.dataFilter.reload();
        }

        this.editorSubmiting = false;
      } catch (e) {
        this.$message.error(`${this.$options.name} 组件错误: 向Api(${api})提交数据失败!`);
        this.editorSubmiting = false;
        throw e;
      }
    },
    $_handleEscape(e) {
      if (e.keyCode === 27) {
        this.$_editorClose();
      }
    },
    $_editorClose() {
      this.$router.push({
        name: this.$route.name.replace(/\.(edit|create)$/, '.index'),
      });
    },
  },
};
