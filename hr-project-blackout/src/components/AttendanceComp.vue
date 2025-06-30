<template>
  <div class="attendance-comp">
    <div v-if="loading" class="text-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <div v-else class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead class="table-primary">
          <tr>
            <th>Employee</th>
            <th v-for="date in uniqueDates" :key="date">{{ formatDate(date) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.employeeId">
            <td class="employee-name">{{ employee.name }}</td>
            <td v-for="date in uniqueDates" :key="`${employee.employeeId}-${date}`"
                :class="getStatusClass(employee, date)">
              {{ getStatus(employee, date) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import attendanceData from '@/data/attendance.json'

export default {
  name: 'AttendanceComp',
  data() {
    return {
      employees: [],
      uniqueDates: [],
      loading: true
    }
  },
  mounted() {
    this.loadAttendanceData()
  },
  methods: {
    loadAttendanceData() {
      this.employees = attendanceData.attendanceAndLeave
      
      const allDates = this.employees.flatMap(emp => 
        emp.attendance.map(item => item.date)
      )
      this.uniqueDates = [...new Set(allDates)].sort()
      
      this.loading = false
    },
    getStatus(employee, date) {
      const attendanceRecord = employee.attendance.find(a => a.date === date)
      return attendanceRecord ? attendanceRecord.status : '-'
    },
    getStatusClass(employee, date) {
      const status = this.getStatus(employee, date)
      return {
        'present': status === 'Present',
        'absent': status === 'Absent',
        'text-center': true
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }
}
</script>

<style scoped>
.attendance-comp {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
}

.employee-name {
  font-weight: 500;
}

th {
  font-weight: 600;
  text-align: center;
}

.present {
  background-color: #e7f3ff; 
  color: #0d6efd; 
}

.absent {
  background-color: #f8f9fa;
  color: #6c757d;
}
</style>