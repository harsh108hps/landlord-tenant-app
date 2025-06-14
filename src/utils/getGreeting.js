// src/utils/getGreeting.js
export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "🌅 Good Morning";
  if (hour < 18) return "☀️ Good Afternoon";
  return "🌆 Good Evening";
};
