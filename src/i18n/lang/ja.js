/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/8
 * Description: 文件描述
 */
import jaLocale from 'element-ui/lib/locale/lang/ja'
const ja = {
  routeName: {
    home: 'ホームページ',
    icon: 'アイコン',
    builtInIcon: '内蔵アイコン',
    permissions: 'おぶじぇくともでる',
    pageControl: 'ページ権限',
    btnControl: 'ボタン権限',
    editor: 'エディタ',
    markdown: 'markdown',
    wangeditor: 'wangeditor',
    multiDirectory: '多段ディレクトリ',
    'menu2-1': 'にきゅう-1',
    'menu2-2': 'にきゅう-2',
    'menu2-3': 'にきゅう-3',
    'menu3-1': 'サード-1',
    'menu3-2': 'サード-2',
    'menu3-3': 'サード-3',
    'menu4-1': '四次構造-1',
    'menu4-2': '四次構造-2',
    'menu5-1': '5級-1',
    systemSettings: 'システム設定',
    navMenu : 'ナビゲーションメニュー',
    systemmanager: 'システム管理',
    usermanager: 'ユーザー管理',
    rolemanager: 'キャスティング管理',
    charmanager: 'kdkdkd管理'
  },
  rightMenu: {
    close: 'しめいかいひ',
    closeOther: '閉鎖其他',
    closeAll: '全て閉鎖'
  },
  role: {
    superAdmin: 'スーパーバイザー',
    admin: 'かんりしゃ',
    ordinary: '一般ユーザー'
  },
  userDropdownMenu: {
    basicInfor: 'きそでーた',
    changePassword: 'パスワードを修正する',
    logout: 'おもいたつ'
  },

  ...jaLocale   //  合并element-ui内置翻译
}

export default ja
