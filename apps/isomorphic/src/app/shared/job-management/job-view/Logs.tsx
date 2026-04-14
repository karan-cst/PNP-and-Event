import React from 'react';
import { ActivityThreads } from '../../file/dashboard/recent-activities';
const activities = [
  {
    threads: [
      {
        avatar: null,
        username: 'Rahul Sharma',
        role: 'cs user',
        logMessage: 'added new file in',
        alias: 'photos',
        date: '09/04/2026 09:28 PM',
        files: [],
      },
      {
        avatar: null,
        username: 'Monty Prismic',
        logMessage: 'edited a file',
        alias: '',
        date: '09/04/2026 01:28 PM',
        files: [],
      },
      {
        avatar: null,
        username: 'Jacky Andersion',
        logMessage: 'uploaded a new file',
        alias: '',
        date: '09/04/2026 11:15 AM',
        files: [],
      },
      {
        avatar: null,
        username: 'Wolbu fenny',
        logMessage: 'added new file in',
        alias: 'photos',
        date: '09/04/2026 06:44 PM',
        files: [],
      },
    ],
  },
];
const Logs = () => {
  return (
    <div className="flex flex-col items-center">
      {' '}
      {activities.map((activity, index) => (
        <ActivityThreads key={`${index}`} threads={activity.threads} />
      ))}
    </div>
  );
};

export default Logs;
