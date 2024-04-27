export default function isDateInThisWeek(date) {
  const todayObj = new Date();
  const eventDate = new Date(new Date(date).toDateString());
  const todayDate = todayObj.getDate();
  const todayDay = todayObj.getDay();

  const firstDayOfWeek = new Date(
    new Date(
      todayObj.setDate(todayDate - todayDay + (todayDay === 0 ? -6 : 1))
    ).toDateString()
  );
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  const endOfWeek = new Date(new Date(lastDayOfWeek).toDateString());

  return eventDate >= firstDayOfWeek && eventDate <= endOfWeek;
}
