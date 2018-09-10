<template>
  <div class="permission-index-view-wrap  curd-wrap">
    <app-data-filter ref="dataFilter" :filter-form-default="filterFormDefault" :filter-api="apiData">
      <template slot="filter" slot-scope="scope">
        <el-row bo>
          <el-col :span="6">
            <el-form-item :label="`${entityType}名称`">
              <el-input v-model="scope.filterForm.display_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item>
              <router-link class="el-button is-round" :to="{name: $_dataListUserRouteCreate}">
                <i class="el-icon-plus"></i>
                添加{{ entityType }}
              </router-link>
              <el-button round native-type="reset" icon="el-icon-refresh">重置</el-button>
              <el-button type="primary" native-type="submit" round icon="el-icon-upload2">筛选</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </template>

      <el-table-column prop="id" label="ID"  sortable="custom"></el-table-column>
      <el-table-column prop="name" label="标识符" sortable="custom"></el-table-column>
      <el-table-column prop="display_name" label="名称"></el-table-column>
      <el-table-column prop="description" label="路由"></el-table-column>
      <el-table-column prop="upatedAt" label="更新时间">
        <template slot-scope="scope">{{ scope.row.updated_at | dateFromNow }}</template>
      </el-table-column>
      <el-table-column prop="route" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="$_dataListHandleEdit(scope.$index, scope.row)">编辑</el-button>
          <app-pop-confirm-button type="danger" label="删除" :message="`确定删除权限: ${scope.row.display_name} ?`"
                                  @confirm="$_dataListHandleDelete(scope.$index, scope.row)">
          </app-pop-confirm-button>
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
    name: 'RoleIndexView',
    data() {
      return {
        entityType: '角色',

        filterFormDefault: {
          display_name: '',
        },

        apiData: 'dash_api.role.list',
      };
    },
  };
</script>