<template>
  <div class="attendance-view">
    <h1 class="mb-4 text-center">Employee Attendance</h1>
    <AttendanceComp />
  </div>
</template>

<script>
import AttendanceComp from '@/components/AttendanceComp.vue'

export default {
  name: 'AttendanceView',
  components: {
    AttendanceComp
  }
}
</script>

<style scoped>
.attendance-view {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}
</style>