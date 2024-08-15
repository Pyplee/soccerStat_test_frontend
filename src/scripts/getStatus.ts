const statuses = {
  SCHEDULED: 'Запланирован',
  LIVE: 'В эфире',
  IN_PLAY: 'В игре',
  PAUSED: 'Пауза',
  FINISHED: 'Завершен',
  POSTPONED: 'Отложен',
  SUSPENDED: 'Приостановлен',
  CANCELED: 'Отменен',
  TIMED: 'Запланирован',
};

const getStatus = (key: string) => {
  return statuses[key as keyof typeof statuses] || 'Неизвестно';
};

export default getStatus;