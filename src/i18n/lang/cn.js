/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/8
 * Description: 文件描述
 */
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
  routeName: {
    home: '主页',
    icon: '图标',
    builtInIcon: '内置图标',
    permissions: '权限管理',
    pageControl: '页面权限',
    btnControl: '按钮权限',
    editor: '编辑器',
    markdown: 'markdown',
    wangeditor: 'wangeditor',
    multiDirectory: '多级目录',
    'menu2-1': '二级-1',
    'menu2-2': '二级-2',
    'menu2-3': '二级-3',
    'menu3-1': '三级-1',
    'menu3-2': '三级-2',
    'menu3-3': '三级-3',
    'menu4-1': '四级-1',
    'menu4-2': '四级-2',
    'menu5-1': '五级-1',
    systemSettings: '系统设置',
    navMenu : '导航菜单',
    systemmanager: '系统管理',
    usermanager: '用户管理',
    rolemanager: '角色管理',
    charmanager: '报表管理'
  },
  rightMenu: {
    close: '关闭',
    closeOther: '关闭其他',
    closeAll: '全部关闭'
  },
  role: {
    superAdmin: '超级管理员',
    admin: '管理员',
    ordinary: '普通用户'
  },
  userDropdownMenu: {
    basicInfor: '基本资料',
    changePassword: '修改密码',
    logout: '退出'
  },

  ...zhLocale   //  合并element-ui内置翻译
}

export default cn
