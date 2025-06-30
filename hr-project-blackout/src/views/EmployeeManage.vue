<template>
  <div class="container">
    <h1>Employee Management</h1>
    <div class="content">
      <EmployeeTable />
      <AddEmployeeForm />
    </div>
  </div>
</template>
<script setup>
import EmployeeTable from '@/components/EmployeeTable.vue'
import AddEmployeeForm from '@/components/AddEmployeeForm.vue'
</script>
<style scoped>
.container {
  padding: 40px;
  font-family: Arial, sans-serif;
}
h1 {
  font-size: 28px;
  margin-bottom: 20px;
}
.content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}
</style>
