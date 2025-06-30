<template>
  <div class="leave-view">
    <h1 class="text-center my-4">Leave Management</h1>
    <LeaveComp :navbarCollapsed="navbarCollapsed" />
  </div>
</template>

<script>
import LeaveComp from '@/components/LeaveComp.vue'

export default {
  name: 'LeaveView',
  components: {
    LeaveComp
  },
  props: {
    navbarCollapsed: Boolean
  }
}
</script>

<style scoped>
.leave-view {
  background-color: #ffffff;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  overflow-x: hidden;
}
</style>