import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.vue'
import Home02 from '@/pages/Home02.vue'
import Home03 from '@/pages/Home03.vue'
import Default from '@/pages/Default.vue'
import Noresult from '@/pages/Noresult.vue'
import Notice from '@/pages/Notice.vue'
import NoticeEdit from '@/pages/NoticeEdit.vue'
import NoticeNoResult from '@/pages/NoticeNoresult.vue'
import Alarm from '@/pages/Alarm.vue'
import MyReport from '@/pages/MyReport.vue'
import MyRole from '@/pages/MyRole.vue'
import MyTask from '@/pages/MyTask.vue'
import Favorites from '@/pages/Favorites.vue'
import Sitemap from '@/pages/Sitemap.vue'
import Error404 from '@/pages/Error404.vue'
import Error505 from '@/pages/Error505.vue'
import Maintenance from '@/pages/Maintenance.vue'
import LoginSignIn from '@/pages/LoginSignIn.vue'
import LoginConfirm from '@/pages/LoginConfirm.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
  { path: '/home02', name: 'Home02', component: Home02 },
  { path: '/home03', name: 'Home03', component: Home03 },
  { path: '/default', name: 'Default', component: Default },
  { path: '/no-result', name: 'Noresult', component: Noresult },
  { path: '/notice', name: 'Notice', component: Notice },
  { path: '/notice-edit', name: 'NoticeEdit', component: NoticeEdit },
  { path: '/notice-no-result', name: 'NoticeNoResult', component: NoticeNoResult },
  { path: '/alarm', name: 'Alarm', component: Alarm },
  { path: '/my-report', name: 'MyReport', component: MyReport },
  { path: '/my-role', name: 'MyRole', component: MyRole },
  { path: '/my-task', name: 'MyTask', component: MyTask },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/sitemap', name: 'Sitemap', component: Sitemap },
  { path: '/error-404', name: 'Error404', component: Error404 },
  { path: '/error-505', name: 'Error505', component: Error505 },
  { path: '/maintenance', name: 'Maintenance', component: Maintenance },
  { path: '/login-sign-in', name: 'LoginSignIn', component: LoginSignIn },
  { path: '/login-confirm', name: 'LoginConfirm', component: LoginConfirm },
]

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
})

export default router 