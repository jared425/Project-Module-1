<template>
  <div v-if="showNavbar" class="app-layout">
    <Navbar @sidebar-collapsed="handleSidebarCollapse" />
    <div :class="['main-content', navbarCollapsed ? 'expanded' : '']">
      <router-view :navbarCollapsed="navbarCollapsed" />
    </div>
  </div>
  <router-view v-else />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

export default {
  components: { Navbar },
  setup() {
    const route = useRoute()
    const showNavbar = computed(() => route.path !== '/login')
    const navbarCollapsed = ref(false)

    const handleSidebarCollapse = (collapsed) => {
      navbarCollapsed.value = collapsed
    }

    return { 
      showNavbar,
      navbarCollapsed,
      handleSidebarCollapse
    }
  }
}
</script>

<style>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  transition: margin-left 0.3s ease;
  margin-left: 250px;
  width: calc(100% - 250px);
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.main-content.expanded {
  margin-left: 70px;
  width: calc(100% - 70px);
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 70px;
    width: calc(100% - 70px);
  }
}

/* Remove default body margin */
body {
  margin: 0;
}
</style>