export default function isDateInThisWeek(date) {
  const todayObj = new Date();
  const eventDate = new Date(date);
  const todayDate = todayObj.getDate();
  const todayDay = todayObj.getDay();

  const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  return eventDate >= firstDayOfWeek && eventDate <= lastDayOfWeek;
}
