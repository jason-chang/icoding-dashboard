<template>
  <div class="permission-index-view-wrap  curd-wrap">
    <app-data-filter ref="dataFilter" :filter-form-default="filterFormDefault" :filter-api="apiData">
      <template slot="filter" slot-scope="scope">
        <el-row bo>
          <el-col :span="6">
            <el-form-item :label="`${entityType}名称`">
              <el-input v-model="scope.filterForm.nickname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item>
              <el-button round native-type="reset" icon="el-icon-refresh">重置</el-button>
              <el-button type="primary" native-type="submit" round icon="el-icon-upload2">筛选</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </template>

      <el-table-column prop="id" label="ID"  sortable="custom"></el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable="custom"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="created_at" label="创建时间">
        <template slot-scope="scope">{{ scope.row.created_at | dateFromNow }}</template>
      </el-table-column>
      <el-table-column prop="activated_at" label="激活时间">
        <template slot-scope="scope">{{ scope.row.activatedAt | dateFromNow }}</template>
      </el-table-column>
      <el-table-column prop="route" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="$_dataListHandleDisable(scope.$index, scope.row)">
            {{ scope.row.blocked_at ? '启用': '禁用' }}
          </el-button>
        </template>
      </el-table-column>
    </app-data-filter>

    <transition name="editor">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  .permission-index-view-wrap {
  }
</style>

<script>
  import dataListMixin from '@/mixins/dataList';

  export default {
    mixins: [dataListMixin],
    name: 'UserIndexView',
    data() {
      return {
        entityType: '分类',

        filterFormDefault: {
          nickname: '',
        },

        apiData: 'dash_api.user.list',
      };
    },
  };
</script>