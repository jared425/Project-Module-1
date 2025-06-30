import payrollData from '@/data/payroll_data.json';

export function calculatePayroll() {
  return payrollData.payrollData.map(employee => {
    const hourlyRate = employee.finalSalary / employee.hoursWorked;
    const leaveHours = employee.leaveDeductions * 8;
    const deductionAmount = hourlyRate * leaveHours;
    const netSalary = employee.finalSalary - deductionAmount;

    return {
      employeeId: employee.employeeId,
      name: employee.name,
      hoursWorked: employee.hoursWorked,
      leaveDeductions: employee.leaveDeductions,
      grossSalary: employee.finalSalary,
      hourlyRate: Number(hourlyRate.toFixed(2)),
      leaveHours,
      deductionAmount: Number(deductionAmount.toFixed(2)),
      netSalary: Number(netSalary.toFixed(2))
    };
  });
}