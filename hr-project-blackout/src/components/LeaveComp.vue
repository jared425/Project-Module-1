<template>
    <div class="leave-comp">
        <div class="d-flex justify-content-end mb-4">
            <button class="btn btn-primary" @click="openLeaveForm">
                <i class="bi bi-plus-circle me-2"></i>Apply for Leave
            </button>
        </div>

        <!-- Leave Application Form -->
        <div v-if="showForm" class="card mb-4 border-primary">
            <div class="card-header bg-primary text-white">     
                <h5 class="mb-0">New Leave Application</h5>
            </div>
            <div class="card-body">
                <form @submit.prevent="submitLeaveRequest">
                    <div class="mb-3">
                        <label class="form-label">Employee</label>
                        <select v-model="newLeave.employeeId" class="form-select" required>
                            <option v-for="employee in employees" :key="employee.employeeId" :value="employee.employeeId">
                                {{ employee.name }}
                            </option>
                        </select>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Reason</label>
                        <textarea v-model="newLeave.reason" class="form-control" rows="3" required></textarea>
                    </div>
                    
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label class="form-label">Start Date</label>
                            <input v-model="newLeave.startDate" type="date" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">End Date</label>
                            <input v-model="newLeave.endDate" type="date" class="form-control" required>
                        </div>
                    </div>
                    
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-secondary me-2" @click="cancelLeaveForm">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Leave Requests Table -->
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-primary">
                    <tr>
                        <th>Employee</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(request, index) in allLeaveRequests" :key="index">
                        <td>{{ getEmployeeName(request.employeeId) }}</td>
                        <td>{{ formatDate(request.startDate) }}</td>
                        <td>{{ formatDate(request.endDate) }}</td>
                        <td>{{ request.reason }}</td>
                        <td :class="getStatusClass(request.status)">
                            {{ request.status }}
                        </td>
                        <td>
                            <button v-if="request.status === 'Pending'" 
                                            class="btn btn-sm btn-success me-1"
                                            @click="updateLeaveStatus(request, 'Approved')">
                                Approve
                            </button>
                            <button v-if="request.status === 'Pending'" 
                                            class="btn btn-sm btn-danger"
                                            @click="updateLeaveStatus(request, 'Denied')">
                                Deny
                            </button>
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
    name: 'LeaveComp',
    data() {
        return {
            employees: [],
            allLeaveRequests: [],
            showForm: false,
            newLeave: {
                employeeId: null,
                reason: '',
                startDate: '',
                endDate: ''
            }
        }
    },
    mounted() {
        this.loadLeaveData()
    },
    methods: {
        loadLeaveData() {
            this.employees = attendanceData.attendanceAndLeave
            
            this.allLeaveRequests = this.employees.flatMap(employee => 
                employee.leaveRequests.map(request => ({
                    ...request,
                    employeeId: employee.employeeId
                }))
            )
        },
        
        openLeaveForm() {
            this.showForm = true
            if (!this.newLeave.employeeId && this.employees.length > 0) {
                this.newLeave.employeeId = this.employees[0].employeeId
            }
        },
        
        cancelLeaveForm() {
            this.showForm = false
            this.resetForm()
        },
        
        resetForm() {
            this.newLeave = {
                employeeId: null,
                reason: '',
                startDate: '',
                endDate: ''
            }
        },
        
        submitLeaveRequest() {
            this.allLeaveRequests.push({
                employeeId: this.newLeave.employeeId,
                startDate: this.newLeave.startDate,
                endDate: this.newLeave.endDate,
                reason: this.newLeave.reason,
                status: 'Pending'
            })
            this.showForm = false
            this.resetForm()
        },
        
        updateLeaveStatus(request, status) {
            request.status = status
        },
        
        getEmployeeName(employeeId) {
            const employee = this.employees.find(e => e.employeeId === employeeId)
            return employee ? employee.name : 'Unknown'
        },
        
        formatDate(dateString) {
            if (!dateString) return ''
            const date = new Date(dateString)
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            })
        },
        
        getStatusClass(status) {
            return {
                'approved': status === 'Approved',
                'denied': status === 'Denied',
                'pending': status === 'Pending'
            }
        }
    }
}
</script>

<style scoped>
.leave-comp {
  margin: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
}

.table {
  width: 100% !important;
  table-layout: fixed;
}

/* Add responsive styles for mobile */
@media (max-width: 1024px) {
  .table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .table {
    width: auto !important;
    min-width: 1024px;
  }
}

th, td {
  white-space: nowrap; /* Prevent text wrapping */
  padding: 8px 12px;
  word-wrap: break-word;
}

/* Column width adjustments */
th:nth-child(1), td:nth-child(1) { width: 15%; }
th:nth-child(2), td:nth-child(2) { width: 10%; }
th:nth-child(3), td:nth-child(3) { width: 10%; }
th:nth-child(4), td:nth-child(4) { width: 30%; }
th:nth-child(5), td:nth-child(5) { width: 10%; }
th:nth-child(6), td:nth-child(6) { width: 25%; }

/* Status colors */
.approved {
  color: #28a745;
  font-weight: bold;
}
.denied {
  color: #dc3545;
  font-weight: bold;
}
.pending {
  color: #ffc107;
  font-weight: bold;
}
</style>