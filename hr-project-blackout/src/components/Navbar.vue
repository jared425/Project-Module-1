<template>
  <div class="sidebar" :class="{ collapsed }">
    <div class="sidebar-header">
      <span v-if="!collapsed">Modern Tech Solutions</span>
      <button @click="toggleSidebar" class="toggle-btn" :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'">
        {{ collapsed ? '›' : '‹' }}
      </button>
    </div>
      <nav class="nav">
        <!-- Dashboard -->
        <router-link to="/dashboard" class="nav-link">
          <span v-if="!collapsed">📊Dashboard</span>
          <span v-else>📊</span>
        </router-link>
        <!-- Attendance -->
        <router-link to="/attendance" class="nav-link">
          <span v-if="!collapsed">📃 Attendance</span>
          <span v-else>📃</span>
        </router-link>
        <!-- Employee Management -->
        <router-link to="/employee-manage" class="nav-link">
          <span v-if="!collapsed">👥 Employee Management</span>
          <span v-else>👥</span>
        </router-link>
          <!--Employee Reivew-->
        <router-link to="/employee-review" class="nav-link">
          <span v-if="!collapsed">📋 Employee Review</span>
          <span v-else>📋</span>
        </router-link>
        <!-- Leave -->
        <router-link to="/leave" class="nav-link">
          <span v-if="!collapsed">🛌 Leave</span>
          <span v-else>🛌</span>
        </router-link>
        <!-- Payroll -->
        <router-link to="/payroll" class="nav-link">
          <span v-if="!collapsed">💰 Payroll</span>
          <span v-else>💰</span>
        </router-link>
        <!-- Logout -->
        <a href="#" @click.prevent="logout" class="nav-link">
          <span v-if="!collapsed">🚪 Logout</span>
          <span v-else>🚪</span>
        </a>
      </nav>
    </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    toggleSidebar() {
      this.collapsed = !this.collapsed;
      this.$emit('sidebar-collapsed', this.collapsed);
    },
    logout() {
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('authTimestamp');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #F8F9FA;
  transition: width 0.3s ease;
  border-right: 1px solid #ccc;
  position: fixed;
  height: 100vh;
  z-index: 100;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  height: 60px;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
}

.nav {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.nav-link {
  padding: 0.7rem 1rem;
  color: #333;
  text-decoration: none;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.nav-link:hover {
  background: #E9ECEF;
  border-radius: 4px;
}

.router-link-active {
  background: #E9ECEF;
  border-radius: 4px;
  font-weight: bold;
}
</style>