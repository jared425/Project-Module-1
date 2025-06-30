import { createRouter, createWebHashHistory } from 'vue-router'
import PayrollView from '@/views/PayrollView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import LeaveView from '@/views/LeaveView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import EmployeeManage from '@/views/EmployeeManage.vue'
import EmployeeReview from '@/views/EmployeeReview.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { public: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/payroll',
    name: 'Payroll',
    component: PayrollView,
    meta: { requiresAuth: true }
  },
  {
    path: '/attendance',
    name: 'Attendance',
    component: AttendanceView,
    meta: { requiresAuth: true }
  },
  {
    path: '/leave',
    name: 'Leave',
    component: LeaveView,
    meta: { requiresAuth: true }
  },
  {
    path: '/employee-manage',
    name: 'EmployeeManage',
    component:EmployeeManage,
    meta: { requiresAuth: true }
  },
  {
    path: '/employee-review',
    name: 'EmployeeReview',
    component: EmployeeReview,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authTimestamp = sessionStorage.getItem('authTimestamp')
  const oneHour = 3600000 // 1 hour in milliseconds
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true' && 
                        authTimestamp && 
                        (Date.now() - parseInt(authTimestamp)) < oneHour

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } 
  else if (to.meta.public && isAuthenticated) {
    next('/dashboard')
  } 
  else {
    next()
  }
})

export default router