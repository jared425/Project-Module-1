<template>
  <div class="page">
    <h1 class="title">Employee Reviews</h1>
    <!-- Search -->
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search employees..."
        class="search-input"
      />
    </div>
    <!-- Employee Cards -->
    <div class="card-grid">
      <div
        v-for="employee in filteredEmployees"
        :key="employee.employeeId"
        class="employee-card"
        @click="openReviewModal(employee)"
      >
        <h2 class="employee-name">{{ employee.name }}</h2>
      </div>
    </div>
    <!-- Review Modal -->
    <div v-if="selectedEmployee" class="modal-overlay">
      <div class="emodal">
        <button class="modal-close" @click="closeModal">×</button>
        <h2 class="modal-title">{{ selectedEmployee.name }}</h2>
        <p class="modal-subtitle">
          {{ selectedEmployee.position }} – {{ selectedEmployee.department }}
        </p>
        <p class="modal-email">Email: {{ selectedEmployee.contact }}</p>
        <label class="review-label">Write a Review:</label>
        <textarea
          v-model="reviewText"
          class="review-textarea"
          placeholder="Enter your review here..."
        ></textarea>
        <button class="submit-btn" @click="submitReview">Submit Review</button>
      </div>
    </div>
    <!-- Success Modal -->
    <div v-if="showSuccess" class="modal-overlay">
      <div class="success-modal">
        <p class="success-message">Review Successfully submitted</p>
        <button class="ok-btn" @click="showSuccess = false">OK</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { state as employeeState } from '@/data/employeeInfo.js'
import attendanceData from '@/data/attendance1.json'
const searchQuery = ref('')
const selectedEmployee = ref(null)
const reviewText = ref('')
const showSuccess = ref(false)
const employeesWithReview = computed(() => {
  return employeeState.employeeInformation.map(emp => {
    const match = attendanceData.attendanceAndLeave.find(a => a.employeeId === emp.employeeId)
    return {
      ...emp,
      attendance: match?.attendance || [],
      leaveRequests: match?.leaveRequests || [],
      rating: Math.floor(Math.random() * 3) + 3
    }
  })
})
const filteredEmployees = computed(() =>
  employeesWithReview.value.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)
const openReviewModal = (employee) => {
  selectedEmployee.value = employee
  reviewText.value = ''
}
const closeModal = () => {
  selectedEmployee.value = null
}
const submitReview = () => {
  if (reviewText.value.trim()) {
    showSuccess.value = true
    selectedEmployee.value = null
    reviewText.value = ''
  }
}
</script>
<style scoped>
.page {
  background-color: #F3F4F6;
  min-height: 100vh;
  padding: 2rem;
}
.title {
  text-align: center;
  color: #1E3A8A;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
.search-container {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}
.search-input {
  width: 100%;
  max-width: 500px;
  padding: 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.75rem;
  font-size: 1rem;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
.employee-card {
  background-color: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.employee-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}
.employee-name {
  font-size: 1.25rem;
  color: #1E40AF;
  font-weight: 600;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.emodal {
  background-color: #FFFFFF;
  padding: 2rem;
  border-radius: 1.25rem;
  width: 100%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #9CA3AF;
  cursor: pointer;
}
.modal-close:hover {
  color: #DC2626;
}
.modal-title {
  color: #1E3A8A;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}
.modal-subtitle {
  color: #6B7280;
  margin-bottom: 0.5rem;
}
.modal-email {
  font-size: 0.875rem;
  color: #6B7280;
  margin-bottom: 1rem;
}
.review-label {
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 0.25rem;
  display: block;
}
.review-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.75rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: vertical;
}
.submit-btn {
  background-color: #2563EB;
  color: white;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}
.submit-btn:hover {
  background-color: #1D4ED8;
}
.success-modal {
  background-color: #FFFFFF;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  width: 300px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
.success-message {
  font-size: 1.125rem;
  color: #059669;
  font-weight: 600;
  margin-bottom: 1rem;
}
.ok-btn {
  background-color: #2563EB;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}
.ok-btn:hover {
  background-color: #1D4ED8;
}
</style>