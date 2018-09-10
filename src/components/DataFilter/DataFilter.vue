<template>
  <div class="app-data-filter-wrap" v-loading="loading">
    <div class="list-wrap">
      <el-form class="filter-form" ref="form" :model="filterForm" label-width="80px"
               @reset.native.prevent="handleResetForm" @submit.native.prevent="loadData">
        <slot name="filter" :filter-form="filterForm"></slot>
      </el-form>
      <el-table ref="listTable" border style="width: 100%" :data="listData" @sort-change="handleSortChange">
        <slot :list-data="listData"></slot>
      </el-table>
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper" justify="end"
        :current-page="pageConfig.current"
        :page-sizes="pageConfig.sizes"
        :page-size="100"
        :total="pageConfig.total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss">
  .app-data-filter-wrap {
    overflow: hidden;
    .filter-form { padding-top: 15px; }
    .el-table { margin-bottom: 10px; }
    .el-pagination { float: right; }
  }
</style>

<script>
  import clone from 'lodash/clone';

  export default {
    name: 'AppDataFilter',
    props: {
      filterApi: {
        type: String,
        required: true,
      },
      filterFormDefault: {
        type: Object,
        required: true,
      },
      mutiSort: {
        type: Boolean,
        required: false,
      },
    },
    data() {
      return {
        loading: false,
        loadTimer: null,

        filterForm: clone(this.filterFormDefault),
        listData: [],
        pageConfig: {
          total: 0,
          current: 1,
          sizes: [100, 200, 300, 400],
          size: 100,
        },
        sortBy: [],
      };
    },
    watch: {
      filterForm() {
        this.deferLoadData();
      },
      pageConfig() {
        this.deferLoadData();
      },
      sortBy() {
        this.deferLoadData();
      },
    },
    computed: {},
    mounted() {
      // this.loadData();
    },
    methods: {
      reload() {
        this.loadData();
      },
      async loadData() {
        this.loading = true;
        const apiUrl = $lib.helpers.route(this.filterApi);

        let sortBy = '';
        if (this.sortBy.length) {
          sortBy = {};
          this.sortBy.forEach(item => {
            sortBy[item.column] = item.order;
          });
        }

        try {
          const { data: { data: { total, data } } } = await this.$http.post(apiUrl, {
            filter: clone(this.filterForm),
            page: this.pageConfig.current,
            page_size: this.pageConfig.size,
            sort_by: sortBy,
          });

          this.listData = data;
          this.pageConfig.total = total;
          this.loading = false;
        } catch (e) {
          this.$notify.error({
            title: `${this.name} 组件: 错误`,
            message: `从Api(${this.filterApi})获取数据失败!`,
          });

          this.loading = false;

          throw e;
        }
      },
      deferLoadData() {
        clearTimeout(this.loadTimer);
        this.loadTimer = setTimeout(this.loadData, 500);
      },
      handleResetForm() {
        this.$refs.listTable.clearSort();
        this.filterForm = clone(this.filterFormDefault);
        this.reload();
      },
      handlePageSizeChange(size) {
        this.pageConfig.size = size;
      },
      handleCurrentChange(page) {
        this.pageConfig.current = page;
      },
      handleSortChange({ prop, order }) {

        order = order === 'ascending' ? 'ASC' : 'DESC';

        if (!prop) {
          this.sortBy.pop();
        } else if (this.mutiSort) {
          const orderBy = this.sortBy.filter(item => item.column !== prop);
          orderBy.push({ order, column: prop });
          this.sortBy = orderBy.push();
        } else {
          this.$set(this.sortBy, 0, { order, column: prop });
        }
      },
    },
    components: {},
  };
</script>