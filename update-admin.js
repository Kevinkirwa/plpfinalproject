const axios = require('axios');

const updateAdmin = async () => {
  try {
    const response = await axios.put('http://localhost:8000/api/v2/user/update-admin-role', {
      email: "admin@example.com",
      role: "Admin"
    });

    console.log('Admin role updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating admin role:', error.response?.data || error.message);
  }
};

updateAdmin(); 