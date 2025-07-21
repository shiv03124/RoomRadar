

export const fetchAdminByEmail = async (email, token) => {
  const response = await fetch(`https://roomradarbackend-production.up.railway.app/api/admins/by-email?email=${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch admin info');
  }

  return await response.json();
};

export const updateRoomStatus = async (roomId, newStatus, adminId, token) => {
  const response = await fetch(
    `https://roomradarbackend-production.up.railway.app/api/rooms/admin/rooms/${roomId}/status?status=${newStatus}&adminId=${adminId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update room status');
  }

  return response;
};