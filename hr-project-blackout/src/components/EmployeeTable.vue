<template>
  <div class="table-section">
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input
        type="text"
        v-model="state.search"
        placeholder="Search employees"
      />
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in filteredEmployees" :key="employee.employeeId">
          <td>{{ employee.name }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.status || 'Active' }}</td>
          <td>
            <button @click="editEmployee(employee)">Edit</button>
            <button @click="deleteEmployee(employee.employeeId)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { state, filteredEmployees, deleteEmployee } from '@/data/employeeInfo.js'
// Assign the employee to the global state so the form can pick it up
function editEmployee(employee) {
  state.editEmployee = { ...employee } // copy to avoid mutating original directly
}
</script>
<style scoped>
.table-section {
  flex: 1;
  min-width: 0;
}
.search-box {
  display: flex;
  align-items: center;
  background: #F5F7FA;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
}
.search-icon {
  margin-right: 10px;
}
.search-box input {
  border: none;
  background: transparent;
  font-size: 16px;
  outline: none;
  width: 100%;
}
table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
button {
  margin-right: 8px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
  cursor: pointer;
}
</style>