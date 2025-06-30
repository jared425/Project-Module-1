<template>
  <div class="payroll-container">
    <!-- Table displaying employee payroll information -->
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="table-primary">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Hours Worked</th>
            <th>Leave Days</th>
            <th>Hourly Rate (R)</th>
            <th>Gross Salary (R)</th>
            <th>Deductions (R)</th>
            <th>Net Salary (R)</th>
            <th>Payslip</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.employeeId" 
              :class="emp.employeeId % 2 === 0 ? 'table-light' : ''">
            <td>{{ emp.employeeId }}</td>
            <td>{{ emp.name }}</td>
            <td>{{ emp.hoursWorked }}</td>
            <td>{{ emp.leaveDeductions }}</td>
            <td>{{ emp.hourlyRate }}</td>
            <td>{{ emp.grossSalary }}</td>
            <td class="text-danger">-{{ emp.deductionAmount }}</td>
            <td class="fw-bold">{{ emp.netSalary }}</td>
            <td>
              <button @click="generatePayslip(emp)" class="btn btn-sm btn-outline-primary">
                Download
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { calculatePayroll } from '@/utils/payrollCalculator.js';
import html2pdf from 'html2pdf.js';

export default {
  name: 'PayrollComp',
  props: {
    navbarCollapsed: Boolean
  },
  data() {
    return {
      employees: calculatePayroll()
    };
  },
  methods: {
    generatePayslip(employee) {
      // Create a payslip HTML template
      const payslipContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
          <h2 style="text-align: center; color: #0d6efd;">Modern Tech Solutions</h2>
          <h3 style="text-align: center; margin-bottom: 30px;">Payslip</h3>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div>
              <p><strong>Employee ID:</strong> ${employee.employeeId}</p>
              <p><strong>Name:</strong> ${employee.name}</p>
            </div>
            <div>
              <p><strong>Pay Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Description</th>
              <th style="padding: 8px; text-align: right; border: 1px solid #ddd;">Amount (R)</th>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Hours Worked</td>
              <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">${employee.hoursWorked}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Hourly Rate</td>
              <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">${employee.hourlyRate}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Leave Days</td>
              <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">${employee.leaveDeductions}</td>
            </tr>
            <tr style="font-weight: bold;">
              <td style="padding: 8px; border: 1px solid #ddd;">Gross Salary</td>
              <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">${employee.grossSalary}</td>
            </tr>
            <tr style="color: red;">
              <td style="padding: 8px; border: 1px solid #ddd;">Deductions</td>
              <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">-${employee.deductionAmount}</td>
            </tr>
            <tr style="font-weight: bold; background-color: #f8f9fa;">
              <td style="padding: 8px; border: 1px solid #ddd;">Net Salary</td>
              <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">${employee.netSalary}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
            <p>This is an automatically generated payslip. Please contact HR for any discrepancies.</p>
          </div>
        </div>
      `;

      // Create a temporary element to hold the payslip content
      const element = document.createElement('div');
      element.innerHTML = payslipContent;

      // Generate PDF from the HTML
      const opt = {
        margin: 10,
        filename: `payslip_${employee.employeeId}_${employee.name}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().from(element).set(opt).save();
    }
  }
};
</script>

<style scoped>
.payroll-container {
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

.table-primary {
  background-color: #0d6efd;
  color: white;
}

.table-striped tbody tr:nth-child(odd) {
  background-color: rgba(13, 110, 253, 0.05);
}

th, td {
  white-space: nowrap; /* Prevent text wrapping */
  padding: 8px 12px;
  word-wrap: break-word;
}

/* Column width adjustments */
th:nth-child(1), td:nth-child(1) { width: 5%; }
th:nth-child(2), td:nth-child(2) { width: 15%; }
th:nth-child(3), td:nth-child(3) { width: 10%; }
th:nth-child(4), td:nth-child(4) { width: 10%; }
th:nth-child(5), td:nth-child(5) { width: 12%; }
th:nth-child(6), td:nth-child(6) { width: 12%; }
th:nth-child(7), td:nth-child(7) { width: 12%; }
th:nth-child(8), td:nth-child(8) { width: 12%; }
th:nth-child(9), td:nth-child(9) { width: 12%; }

.btn-outline-primary {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
</style>