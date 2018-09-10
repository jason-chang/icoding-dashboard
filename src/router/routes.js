/* eslint import/no-dynamic-require: 0 */

let resolveView;

module.exports.setViewResolver = function setViewResolver(resolver) {
  resolveView = resolver;
};

module.exports.getRoutes = function getRoutes() {

  const mainRoutes = [
    {
      path: 'home',
      name: 'dashboard.overview',
      component: resolveView('@/views/Overview'),
      meta: { title: '总览' },
    },
    {
      path: 'opration',
      name: 'dashboard.opration',
      component: resolveView('@/views/Opration'),
      meta: { title: '运营' },
    },
    {
      path: 'user',
      name: 'dashboard.user.index',
      component: resolveView('@/views/User/Index'),
      meta: { title: '用户管理' },
    },
    {
      // 权限管理
      path: 'permission',
      component: resolveView('@/views/Permission/Index'),
      children: [
        {
          path: '/',
          name: 'dashboard.permission.index',
          component: resolveView('@/views/Empty'),
          meta: { title: '权限管理' },
        },
        {
          path: 'create',
          name: 'dashboard.permission.create',
          component: resolveView('@/views/Permission/Editor'),
          meta: { title: '添加权限' },
        },
        {
          path: ':id(\\d+)/edit',
          name: 'dashboard.permission.edit',
          component: resolveView('@/views/Permission/Editor'),
          meta: { title: '编辑权限' },
        },
      ],
    },
    {
      // 角色
      path: 'role',
      component: resolveView('@/views/Role/Index'),
      children: [
        {
          path: '/',
          name: 'dashboard.role.index',
          component: resolveView('@/views/Empty'),
          meta: { title: '角色管理' },
        },
        {
          path: 'create',
          name: 'dashboard.role.create',
          component: resolveView('@/views/Role/Editor'),
          meta: { title: '创建角色' },
        },
        {
          path: ':id(\\d+)/edit',
          name: 'dashboard.role.edit',
          component: resolveView('@/views/Role/Editor'),
          meta: { title: '编辑角色' },
        },
      ],
    },
    {
      // 分类
      path: 'category',
      component: resolveView('@/views/Category/Index'),
      children: [
        {
          path: '/',
          name: 'dashboard.category.index',
          component: resolveView('@/views/Empty'),
          meta: { title: '分类管理' },
        },
        {
          path: 'create',
          name: 'dashboard.category.create',
          component: resolveView('@/views/Category/Editor'),
          meta: { title: '创建分类' },
        },
        {
          path: ':id(\\d+)/edit',
          name: 'dashboard.category.edit',
          component: resolveView('@/views/Category/Editor'),
          meta: { title: '编辑分类' },
        },
      ],
    },
    {
      // 文章
      path: 'article/usual',
      name: 'dashboard.article.usual.index',
      component: resolveView('@/views/Article/Index'),
      meta: { title: '文章管理' },
    },
    {
      // 精华
      path: 'article/good',
      name: 'dashboard.article.good.index',
      component: resolveView('@/views/Article/Good'),
      meta: { title: '精华管理' },
    },
  ];

  const routes = [
    {
      path: '/',
      redirect: { name: 'dashboard.overview' },
    },
    {
      path: '/404',
      name: 'dashboard.not-found',
      component: resolveView('@/views/404'),
      meta: { title: '404-PageNotFound' },
    },
    {
      path: '*',
      component: resolveView('@/views/Empty'),
      beforeEnter(to, from, next) {
        next({ name: 'dashboard.not-found', query: { error: `Path '${to.path}' not found` } });
      },
    },
    {
      path: '/',
      component: resolveView('@/views/Main'),
      children: mainRoutes, // app 路由
    },
  ];

  return routes;
};
