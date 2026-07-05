export default function isDateInThisWeek(date) {
  const todayObj = new Date();
  const eventDate = new Date(new Date(date).toDateString());
  const todayDay = todayObj.getDay();

  const firstDayOfWeek = new Date(
    todayObj.setDate(todayObj.getDate() - todayDay + (todayDay === 0 ? -6 : 1))
  );
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  const endOfWeek = new Date(lastDayOfWeek.toDateString());

  return eventDate >= firstDayOfWeek && eventDate <= endOfWeek;
}
