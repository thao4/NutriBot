import { atom, atomFamily } from 'recoil';

// Helper function to get the current week's Monday date
const getCurrentWeekMonday = () => {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - now.getDay() + 1);
  return monday.toISOString().slice(0, 10);
};

// Atom for the current week's start date
export const currentWeekState = atom({
  key: 'currentWeekState',
  default: getCurrentWeekMonday(),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('currentWeek', newValue);
      });
    },
    ({ setSelf }) => {
      const savedValue = localStorage.getItem('currentWeek');
      if (savedValue) {
        setSelf(savedValue);
      }
    },
  ],
});

// Atom for the meal plan
export const mealPlanState = atom({
  key: 'mealPlanState',
  default: {},
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('mealPlan', JSON.stringify(newValue));
      });
    },
    ({ setSelf }) => {
      const savedValue = localStorage.getItem('mealPlan');
      if (savedValue) {
        setSelf(JSON.parse(savedValue));
      }
    },
  ],
});

// Atom for the selected meal slot
export const selectedMealSlotState = atom({
  key: 'selectedMealSlotState',
  default: null,
});

// Helper function to get meal plan key
export const getMealPlanKey = (date) => {
  const monday = new Date(date);
  monday.setDate(monday.getDate() - monday.getDay() + 1);
  return monday.toISOString().slice(0, 10);
};

// Helper function to format date for display
export const formatDate = (dateString) => {
  // Convert string to Date object if it's not already
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  // Check if date is valid
  if (!(date instanceof Date) || isNaN(date)) {
    console.error('Invalid date:', dateString);
    return 'Invalid Date';
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}; 