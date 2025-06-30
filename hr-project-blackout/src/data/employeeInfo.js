import { reactive, computed } from 'vue'
const state = reactive({
  employeeInformation: [
    {
      employeeId: 1,
      name: "Sibongile Nkosi",
      position: "Software Engineer",
      department: "Development",
      salary: 70000,
      employmentHistory: "Joined in 2015, promoted to Senior in 2018",
      contact: "sibongile.nkosi@moderntech.com",
      status: "Active"
    },
    {
      employeeId: 2,
      name: "Lungile Moyo",
      position: "HR Manager",
      department: "HR",
      salary: 80000,
      employmentHistory: "Joined in 2013, promoted to Manager in 2017",
      contact: "lungile.moyo@moderntech.com",
      status: "Active"
    },
    {
      employeeId: 3,
      name: "Thabo Molefe",
      position: "Quality Analyst",
      department: "QA",
      salary: 55000,
      employmentHistory: "Joined in 2018",
      contact: "thabo.molefe@moderntech.com",
      status: "Inactive"
    },
    {
      employeeId: 4,
      name: "Keshav Naidoo",
      position: "Sales Representative",
      department: "Sales",
      salary: 60000,
      employmentHistory: "Joined in 2020",
      contact: "keshav.naidoo@moderntech.com",
      status: "Active"
    },
    {
      employeeId: 5,
      name: "Zanele Khumalo",
      position: "Marketing Specialist",
      department: "Marketing",
      salary: 58000,
      employmentHistory: "Joined in 2019",
      contact: "zanele.khumalo@moderntech.com",
      status: "Active"
    },
    {
      employeeId: 6,
      name: "Sipho Zulu",
      position: "UI/UX Designer",
      department: "Design",
      salary: 65000,
      employmentHistory: "Joined in 2016",
      contact: "sipho.zulu@moderntech.com",
      status: "Active"
    },
    {
      employeeId: 7,
      name: "Naledi Moeketsi",
      position: "DevOps Engineer",
      department: "IT",
      salary: 72000,
      employmentHistory: "Joined in 2017",
      contact: "naledi.moeketsi@moderntech.com",
      status: "Inactive"
    },
    {
      employeeId: 8,
      name: "Farai Gumbo",
      position: "Content Strategist",
      department: "Marketing",
      salary: 56000,
      employmentHistory: "Joined in 2021",
      contact: "farai.gumbo@moderntech.com",
      status: "Active"
    },
    {
      employeeId: 9,
      name: "Karabo Dlamini",
      position: "Accountant",
      department: "Finance",
      salary: 62000,
      employmentHistory: "Joined in 2018",
      contact: "karabo.dlamini@moderntech.com",
      status: "Active"
    },
    {
      employeeId: 10,
      name: "Fatima Patel",
      position: "Customer Support Lead",
      department: "Support",
      salary: 58000,
      employmentHistory: "Joined in 2016",
      contact: "fatima.patel@moderntech.com",
      status: "Active"
    }
  ],
  search: '',
  editEmployee: null
})
// --- COMPUTED VALUES ---
const filteredEmployees = computed(() =>
  state.employeeInformation.filter(e =>
    e.name.toLowerCase().includes(state.search.toLowerCase())
  )
)
const totalEmployees = computed(() => state.employeeInformation.length)
const totalActiveEmployees = computed(() =>
  state.employeeInformation.filter(e => e.status !== 'Inactive').length
)
const totalSalaries = computed(() =>
  state.employeeInformation.reduce((sum, e) => sum + (e.salary || 0), 0)
)
// --- MUTATION FUNCTIONS ---
function addEmployee(emp) {
  emp.employeeId = Date.now()
  if (!emp.status) emp.status = 'Active'
  state.employeeInformation.push(emp)
}
function updateEmployee(updated) {
  const index = state.employeeInformation.findIndex(e => e.employeeId === updated.employeeId)
  if (index !== -1) state.employeeInformation[index] = updated
}
function deleteEmployee(id) {
  const index = state.employeeInformation.findIndex(e => e.employeeId === id)
  if (index !== -1) state.employeeInformation.splice(index, 1)
}
function clearEditEmployee() {
  state.editEmployee = null
}
// --- EXPORT EVERYTHING ---
export {
  state,
  filteredEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  clearEditEmployee,
  totalEmployees,
  totalActiveEmployees,
  totalSalaries
}