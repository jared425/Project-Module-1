<template>
  <div class="dashboard">
    <h1>DASHBOARD</h1>
    <!-- Metric Cards Using CardDash -->
    <div class="metrics">
      <CardDash icon="👥" label="Total Employees" :value="totalEmployees" />
      <CardDash icon="👤" label="Active Employees" :value="totalActiveEmployees" />
      <CardDash icon="💰" label="Total Payroll" :value="`$${totalSalaries.toLocaleString()}`" />
      <CardDash icon="📄" label="Pending Leave Requests" value="5" />
    </div>
    <!-- Info Section: Announcements & Quick Stats -->
    <div class="info-section">
      <!-- ANNOUNCEMENTS -->
      <div class="announcements">
        <h3>ANNOUNCEMENTS</h3>
        <ul>
          <li v-for="(announcement, index) in announcements" :key="index">{{ announcement }}</li>
        </ul>
        <!-- Add Announcement Form -->
        <input
          v-model="newAnnouncement"
          placeholder="Write new announcement..."
          class="announcement-input"
        />
        <button @click="addAnnouncement" class="primary">Add</button>
      </div>
      <!-- QUICK STATS -->
      <div class="quick-stats">
        <h3>QUICK STATS</h3>
        <ul>
          <li>Active Employees: {{ totalActiveEmployees }}</li>
          <li>Total Employees: {{ totalEmployees }}</li>
          <li>Departments: 5</li>
        </ul>
      </div>
    </div>
    <!-- QUICK LINKS -->
    <div class="quick-links">
      <h3>QUICK LINKS</h3>
      <button class="primary">ADD EMPLOYEE</button>
      <button class="primary">REQUEST LEAVE</button>
    </div>
    <!-- RECENT LEAVE REQUESTS TABLE -->
    <div class="recent-requests">
      <h3>RECENT LEAVE REQUESTS</h3>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sibongile Nkosi</td>
            <td>2024-04-10</td>
            <td><span class="status approved">Approved</span></td>
          </tr>
          <tr>
            <td>Thabo Molefe</td>
            <td>2024-04-15</td>
            <td><span class="status pending">Pending</span></td>
          </tr>
          <tr>
            <td>Karabo Dlamini</td>
            <td>2024-04-20</td>
            <td><span class="status rejected">Rejected</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
// Import reusable Card component
import CardDash from '@/components/CardDash.vue'
// Import computed values from store
import {
  totalEmployees,
  totalActiveEmployees,
  totalSalaries
} from '@/data/employeeInfo.js'
// Import Vue reactive utilities
import { ref } from 'vue'
// Reactive list of announcements
const announcements = ref([
  "Yoh it's day one and this project is Killing me nikka",
  "Project is due on Monday!!! yay"
])
// Model for the new announcement input
const newAnnouncement = ref('')
// Function to add a new announcement
const addAnnouncement = () => {
  if (newAnnouncement.value.trim() !== '') {
    announcements.value.push(newAnnouncement.value.trim())
    newAnnouncement.value = '' // Clear input after adding
  }
}
</script>

<style scoped>
.dashboard {
  font-family: Arial, sans-serif;
  padding: 2rem;
  background-color: #fff;
  color: #000;
}
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.metrics {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.info-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.announcements,
.quick-stats {
  flex: 1;
  background-color: #F5F5F5;
  padding: 1rem;
  border-radius: 8px;
}
.announcements ul {
  padding-left: 1.2rem;
  margin-bottom: 1rem;
}
.announcement-input {
  padding: 0.5rem;
  width: calc(100% - 2rem);
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.quick-stats ul {
  list-style-type: disc;
  padding-left: 1.2rem;
}
.quick-links {
  margin-bottom: 2rem;
}
.quick-links button {
  margin-right: 1rem;
  margin-bottom: 0.5rem;
}
.primary {
  background-color: #1E88E5;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}
.primary:hover {
  background-color: #1565C0;
}
.recent-requests table {
  width: 100%;
  border-collapse: collapse;
}
.recent-requests th,
.recent-requests td {
  border: 1px solid #ccc;
  padding: 0.6rem;
  text-align: left;
}
.recent-requests th {
  background-color: #F0F0F0;
}
.status {
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}
.status.approved {
  background-color: #D4EDDA;
  color: #2E7D32;
}
.status.pending {
  background-color: #FFF3CD;
  color: #856404;
}
.status.rejected {
  background-color: #F8D7DA;
  color: #C62828;
}
</style>