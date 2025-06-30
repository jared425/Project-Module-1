import { reactive } from 'vue';
import attendanceData from '@/data/attendance.json';

const store = reactive({
  attendanceData: [],
  
  init() {
    this.attendanceData = attendanceData.attendanceAndLeave;
  }
});

// Initialize the store
store.init();

export { store };