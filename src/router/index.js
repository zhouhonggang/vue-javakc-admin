import en from '../i18n/lang/en'
import Vue from 'vue'
import Router from 'vue-router'
import CommerViews from '@/views/commerViews'
import Login from '@/views/login/index'
import Layout from '@/views/layout/layout'
import HomeMain from '@/views/index/mainIndex'

// 不是必须加载的组件使用懒加载
const Icon = () => import('@/views/icon/index')
const Erji = () => import('@/views/duoji/erji')
const Erji2 = () => import('@/views/duoji/erji2')
const Sanji = () => import('@/views/duoji/sanji')
const Sanji2 = () => import('@/views/duoji/sanji2')
const Siji = () => import('@/views/duoji/siji')
const Wuji = () => import('@/views/duoji/wuji')
const Markdown = () => import('@/views/editor/markdownView')
const WangeditorView = () => import('@/views/editor/wangeditorView')
const NotFound = () => import('@/page404')
const SystemUser = () => import('@/views/system/user/User')
const SystemRole = () => import('@/views/system/role/Role')

Vue.use(Router)
let routeName = en.routeName
let defaultRouter = [
  { path: '/',
    redirect: '/index',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/index',
    iconCls: 'fa fa-dashboard', // 图标样式class
    name: routeName.home,
    component: Layout,
    alone: true,
    children: [
      {
        path: '/index',
        iconCls: 'fa fa-dashboard',
        name: '主页',
        component: HomeMain,
        children: []
      }
    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true,
    children: []
  },
]

let addRouter = [
  //图标管理
  {
    path: '/',
    iconCls: 'fa fa-paw', // 图标样式class
    name: routeName.icon,
    component: Layout,
    children: [
      {
        path: '/icon',
        iconCls: 'fa fa-life-ring',
        name: routeName.builtInIcon,
        component: Icon,
        children: []
      }
    ]
  },
  //编辑器
  {
    path: '/',
    iconCls: 'el-icon-edit', // 图标样式class
    name: routeName.editor,
    component: Layout,
    meta: {role: ['superAdmin', 'admin']},
    children: [
      {
        path: '/markdown',
        iconCls: 'fa fa-file-code-o', // 图标样式class
        name: routeName.markdown,
        component: Markdown,
        children: []
      },
      {
        path: '/wangeditor',
        iconCls: 'fa fa-file-code-o', // 图标样式class
        name: routeName.wangeditor,
        component: WangeditorView,
        children: []
      }
    ]
  },
  //系统管理
  {
    path: '/',
    iconCls: 'fa fa-gears', // 图标样式class
    name: routeName.systemmanager,
    component: Layout,
    children: [
      {
        path: '/system/user',
        iconCls: 'fa fa-user-o',
        name: routeName.usermanager,
        component: SystemUser,
        children: []
      },
      {
        path: '/system/role',
        iconCls: 'fa fa-handshake-o',
        name: routeName.rolemanager,
        component: SystemRole,
        children: []
      }
    ]
  },
  //多级目录
  {
    path: '/',
    iconCls: 'fa fa-server',
    name: routeName.multiDirectory,
    component: Layout,
    children: [
      {
        path: '/erji1',
        iconCls: 'fa fa-server',
        name: routeName['menu2-1'],
        component: Erji,
        children: []
      },
      {
        path: '/erji2',
        iconCls: 'fa fa-server',
        name: routeName['menu2-2'],
        component: Erji2,
        children: []
      },
      {
        path: '/erji3',
        iconCls: 'fa fa-server',
        name: routeName['menu2-3'],
        component: CommerViews, // 无限极菜单的容器
        children: [
          {
            path: '/sanji1',
            iconCls: 'fa fa-server',
            name: routeName['menu3-1'],
            component: Sanji,
            children: []
          },
          {
            path: '/sanji2',
            iconCls: 'fa fa-server',
            name: routeName['menu3-2'],
            component: Sanji2,
            children: []
          },
          {
            path: '/sanji3',
            iconCls: 'fa fa-server',
            name: routeName['menu3-3'],
            component: CommerViews,
            children: [
              {
                path: '/siji',
                iconCls: 'fa fa-server',
                name: routeName['menu4-1'],
                component: Siji,
                children: []
              },
              {
                path: '/siji1',
                iconCls: 'fa fa-server',
                name: routeName['menu4-2'],
                component: CommerViews,
                children: [
                  {
                    path: '/wuji',
                    iconCls: 'fa fa-server',
                    name: routeName['menu5-1'],
                    component: Wuji,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

export default new Router({
  routes: defaultRouter
})
export {defaultRouter, addRouter}
