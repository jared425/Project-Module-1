<template>
  <div class="payroll-view">
    <h1 class="text-center my-4">Employee Payroll</h1>
    <PayrollComp :navbarCollapsed="navbarCollapsed"/>
  </div>
</template>

<script>
import PayrollComp from '@/components/PayrollComp.vue'

export default {
  name: 'PayrollView',
  components: {
    PayrollComp
  },
  props: {
    navbarCollapsed: Boolean
  }
};
</script>

<style scoped>
.payroll-view {
  background-color: #ffffff;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  overflow-x: hidden;
}
</style>