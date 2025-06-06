export default function getTaskDeadlineColor(dueDate: string, currentDate: string): string {
  const now = new Date(currentDate);
  const deadline = new Date(dueDate);
  const timeDifference = deadline.getTime() - now.getTime();

  const hoursDifference = timeDifference / (1000 * 60 * 60);

  if (hoursDifference < 0) {
    return 'text-negative text-weight-bolder'; // Просрочено
  } else if (hoursDifference <= 4) {
    return 'text-negative';
  } else if (hoursDifference <= 24) {
    return 'text-warning';
  } else {
    return 'text-positive';
  }
}
