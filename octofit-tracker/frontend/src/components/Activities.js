import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('https://super-duper-space-memory-4rqp6pwg6xh979-8000.app.github.dev/api/activities/')
      .then(response => response.json())
      .then(data => {
        console.log('Activities data:', data); // For debugging
        setActivities(data);
      })
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  const formatDuration = (duration) => {
    if (!duration) return '';
    return duration;
  };

  return (
    <div>
      <h1 className="text-center my-4">Activities</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Activity Type</th>
            <th>Duration</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => {
            console.log('Activity:', activity); // For debugging
            return (
              <tr key={activity._id}>
                <td>{activity.activity_type}</td>
                <td>{formatDuration(activity.duration)}</td>
                <td>{activity.user ? activity.user.username : 'Unknown'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
