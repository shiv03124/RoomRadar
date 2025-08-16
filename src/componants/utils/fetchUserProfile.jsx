import axios from 'axios';
const API_BASE_URL = 'https://roomradarbackend.onrender.com/api/users';
const api_base="https://roomradarbackend.onrender.com/api/rooms"

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`
  };
};

export const fetchUserProfile = async (navigate) => {
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  if (!email || !token) {
    localStorage.clear();
    navigate('/login');
    return null;
  }

  try {
    const response = await fetch(`https://roomradarbackend.onrender.com/api/users/email/${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();

    if (data.id) {
      localStorage.setItem('userId', data.id);
    }

    return data;
  } catch (err) {
    console.error("Error fetching user profile:", err);
    localStorage.clear();
    navigate('/login');
    return null;
  }
};


export const fetchRooms = async (url) => {
  try {
    const response = await fetch(url);
 
    if (!response.ok) {
      throw new Error('Failed to fetch rooms');
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching rooms:", err);
    throw err;
  }
};
export const fetchRoomById = async ( publicId) => {
  try {
     const response = await fetch(`${api_base}/getRoom/byPublicId/${publicId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch room');
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching room:", err);
    throw err;
  }
};


export const fetchApplications = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    if (!userId) {
      throw new Error('Could not retrieve user information');
    }

    const response = await fetch(`https://roomradarbackend.onrender.com/api/applications/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch applications');
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching applications:", err);
    throw err;
  }
};

export const fetchRoomApplications = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // First fetch the room details
    const roomResponse = await fetch(`https://roomradarbackend.onrender.com/api/rooms/getRoom/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!roomResponse.ok) {
      const errorData = await roomResponse.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to fetch room details');
    }
    
    // Then fetch applications for the room
    const appsResponse = await fetch(`https://roomradarbackend.onrender.com/api/applications/room/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!appsResponse.ok) {
      const errorData = await appsResponse.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to fetch room applications');
    }

    const applications = await appsResponse.json();
    
    // Fetch user details for each application
    const applicationsWithUserDetails = await Promise.all(
      applications.map(async (app) => {
        if (!app.applicantId) {
          console.warn('Application missing applicantId:', app.id);
          return app;
        }

        try {
          const userResponse = await fetch(`https://roomradarbackend.onrender.com/api/users/${app.applicantId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!userResponse.ok) {
            console.warn(`Failed to fetch user ${app.applicantId} for application ${app.id}`);
            return app;
          }

          const userData = await userResponse.json();
          return { ...app, applicant: userData };
        } catch (err) {
          console.error(`Error fetching user ${app.applicantId} details:`, err);
          return app;
        }
      })
    );

    return applicationsWithUserDetails;
  } catch (err) {
    console.error("Error in fetchRoomApplications:", err);
    throw err;
  }
};

export const handleApplicationAction = async (applicationId, action) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // For APPROVE/REJECT actions
    if (action === 'ACCEPTED' || action === 'REJECTED') {
      const response = await fetch(`https://roomradarbackend.onrender.com/api/applications/${applicationId}/status?status=${action}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update application status');
      }
    } 
    // For DELETE action
    else if (action === 'DELETE') {
      const response = await fetch(`https://roomradarbackend.onrender.com/api/applications/${applicationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete application');
      }
    }
    
    return true;
  } catch (err) {
    console.error("Error processing application action:", err);
    throw err;
  }
};

export const deleteRoom = async (roomId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Session expired. Please login again.');
  }

  const response = await fetch(`https://roomradarbackend.onrender.com/api/rooms/delete/${roomId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete room');
  }

  return true;
};

export const addRoom = async (newRoom, userId) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Session expired. Please login again.');
  }

  // Create FormData object
  const formData = new FormData();
  
  // Create roomDTO object
  const roomDTO = {
    title: newRoom.title,
    description: newRoom.description,
    address: newRoom.address,
    city: newRoom.city,
    area: newRoom.area,
    noofvacancies:newRoom.noofvacancies,
    roomType: newRoom.roomType,
    furnished: newRoom.furnished,
    availableFrom: newRoom.availableFrom,
    rent: newRoom.rent,
    accommodationType:newRoom.accommodationType,
totalNoOfPeoples:newRoom.totalNoOfPeoples,
    totalNoOfPeoples:newRoom.totalNoOfPeoples,
    securityDeposit: newRoom.securityDeposit,
    preferredGender: newRoom.preferredGender,
    isAvailable: newRoom.isAvailable,
    amenities: newRoom.amenities
  };

  // Append roomDTO as JSON string
  formData.append('roomDTO', JSON.stringify(roomDTO));

  // Append images
  newRoom.images.forEach(image => {
    formData.append('images', image);
  });

  const response = await fetch(`https://roomradarbackend.onrender.com/api/rooms/add/${userId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMsg = errorData?.message || 
                   errorData?.error || 
                   `Server responded with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return await response.json();
};

export const updateRoom = async (room, roomId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Session expired. Please login again.');
  }

  const formData = new FormData();
  
  // Create roomDTO object
  const roomDTO = {
    title: room.title,
    description: room.description,
    address: room.address,
    city: room.city,
    area: room.area,
    roomType: room.roomType,
    furnished: room.furnished,
    availableFrom: room.availableFrom,
    totalNoOfPeoples:room.totalNoOfPeoples,
    rent: room.rent,
    securityDeposit: room.securityDeposit,
    preferredGender: room.preferredGender,
     accommodationType:room.accommodationType,
    isAvailable: room.isAvailable,
    amenities: room.amenities,
  };

  // Append roomDTO as JSON string
  formData.append('roomDTO', JSON.stringify(roomDTO));

  // Append images
  room.images.forEach(image => {
    if (typeof image === 'object' && image instanceof File) {
      formData.append('images', image);
    }
  });

  const response = await fetch(`https://roomradarbackend.onrender.com/api/rooms/update-with-images/${roomId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to update room');
  }
 
  return await response.json();
}; 

export const handleApply = async (roomId, message) => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('userEmail');

  if (!token || !email) {
    console.warn('User not logged in');
    return { success: false, alreadyApplied: false };
  }

  try {
    const user = await fetchUserProfile();
    if (!user?.id) {
      console.warn('User ID missing');
      return { success: false, alreadyApplied: false };
    }

    const checkResponse = await fetch(
      `https://roomradarbackend.onrender.com/api/applications/check?userId=${user.id}&roomId=${roomId}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    if (checkResponse.ok) {
      const { applied } = await checkResponse.json();
      if (applied) {
        console.log("Already applied");
        return { success: true, alreadyApplied: true };
      }
    }

    const response = await fetch('https://roomradarbackend.onrender.com/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message: message || "I am interested in this room. Please let me know the next steps.",
        status: "PENDING",
        applicantId: user.id,
        roomId: roomId
      })
    });

    if (!response.ok) {
      console.error('Failed to submit application');
      return { success: false, alreadyApplied: false };
    }

    return { success: true, alreadyApplied: false };
  } catch (err) {
    console.error("Application failed:", err);
    return { success: false, alreadyApplied: false };
  }
};



export const updateUserProfile = async (user, userId, imageFile = null) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Session expired. Please login again.');

  const formData = new FormData();
  formData.append('userDTO', JSON.stringify(user));

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await fetch(`https://roomradarbackend.onrender.com/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) throw new Error('Failed to update profile');
  return await response.json();
};


export const fetchUserApplications = async (userId) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`https://roomradarbackend.onrender.com/api/applications/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch applications');
  }

  return await response.json();
};

export const fetchroomswithuserid = async (userId) => {
  
  try {
    const response = await fetch(`https://roomradarbackend.onrender.com/api/applications/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user applications with rooms');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user applications with rooms:', error);
    throw error;
  }
};

// utils/dateFormatter.js
export const formatLocalDateTime = (dateTimeString) => {
  if (!dateTimeString) return 'N/A';
  
  try {
    // Split the LocalDateTime string into date and time parts
    const [datePart, timePart] = dateTimeString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    
    // Create a proper ISO string that JavaScript can parse
    const isoString = `${datePart}T${timePart}.000Z`;
    
    const date = new Date(isoString);
    
    // Format as DD-MM-YYYY
    const formattedDate = [
      day.padStart(2, '0'),
      month.padStart(2, '0'),
      year
    ].join('-');
    
    // Format time as HH:MM
    const formattedTime = [
      hours.padStart(2, '0'),
      minutes.padStart(2, '0')
    ].join(':');
    
    return {
      date: formattedDate,
      time: formattedTime,
      full: `${formattedTime} IN ${formattedDate}`
    };
  } catch (error) {
    console.error('Error formatting date:', error);
    return {
      date: 'N/A',
      time: '',
      full: 'N/A'
    };
  }
};

// utils/roomApi.js

export const getRoomById = async (roomId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://roomradarbackend.onrender.com/api/rooms/getRoom/byPublicId/${roomId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch room');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    throw error;
  }
};



