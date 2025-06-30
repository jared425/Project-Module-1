<template>
  <div class="form-container">
    <!-- Add Employee Toggle Button -->
    <button class="add-btn" @click="toggleForm">
      {{ isEditing ? 'Edit Employee' : (showForm ? 'Cancel' : '+ Add Employee') }}
    </button>
    
    <!-- Form appears only if showForm is true -->
    <div v-if="showForm || isEditing" class="form-card">
      <h2>{{ isEditing ? 'Edit Employee' : 'Add Employee' }}</h2>
      <input v-model="employee.name" placeholder="Full Name & Surname" />
      <input v-model="employee.contact" placeholder="Email" />
      <input v-model="employee.position" placeholder="Position" />
      <input v-model="employee.salary" type="number" placeholder="Salary" />
      <select v-model="employee.department">
        <option disabled value="">Select Department</option>
        <option>Development</option>
        <option>HR</option>
        <option>QA</option>
        <option>Sales</option>
        <option>Marketing</option>
        <option>Design</option>
        <option>IT</option>
        <option>Finance</option>
        <option>Support</option>
      </select>
      <select v-model="employee.status">
        <option>Active</option>
        <option>Inactive</option>
      </select>
      <textarea v-model="employee.employmentHistory" placeholder="Employment History" />
      <div class="btn-group">
        <button @click="resetForm">Cancel</button>
        <button class="submit-btn" @click="handleSubmit">
          {{ isEditing ? 'Update' : 'Add' }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { state, addEmployee, updateEmployee, clearEditEmployee } from '@/data/employeeInfo.js'
const showForm = ref(false)
const employee = ref({
  name: '',
  contact: '',
  department: '',
  position: '',
  salary: '',
  status: 'Active',
  employmentHistory: ''
})
const isEditing = ref(false)
// If someone clicks "Edit" in table, populate the form
watch(() => state.editEmployee, (newVal) => {
  if (newVal) {
    employee.value = { ...newVal }
    isEditing.value = true
    showForm.value = true
  }
})
// Toggle Add form manually
function toggleForm() {
  if (isEditing.value) return
  showForm.value = !showForm.value
}
// Add or Update employee
function handleSubmit() {
  if (!employee.value.name || !employee.value.contact || !employee.value.department) return
  if (isEditing.value) {
    updateEmployee({ ...employee.value })
  } else {
    addEmployee({ ...employee.value })
  }
  resetForm()
}
function resetForm() {
  employee.value = {
    name: '',
    contact: '',
    department: '',
    position: '',
    salary: '',
    status: 'Active',
    employmentHistory: ''
  }
  showForm.value = false
  isEditing.value = false
  clearEditEmployee()
}
</script>
<style scoped>
.form-container {
  width: 100%;
  max-width: 300px;
}
.add-btn {
  background-color: #2563EB;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 15px;
  margin-bottom: 20px;
  cursor: pointer;
  width: 100%;
}
.form-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}
input,
select,
textarea {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
textarea {
  resize: vertical;
}
.btn-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.submit-btn {
  background-color: #2563EB;
  color: white;
  border: none;
}
</style>