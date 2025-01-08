import axios from "axios";

export const getAllFreelancers = async () => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/admin/getAllFreelancerRegisterations`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    window.location.href = error.response.data.redirect;
    console.log(error);
  }
};

export const getFreelancerById = async (id) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/admin/getRegisteration/${id}?role=freelancer`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(res.data);
    if (res.data.redirect) {
      window.location.href = res.data.redirect;
    } else {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const choice = async (selection, id, role) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/${id}/${selection}`,
      {
        role: role, // Body
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Headers
        },
      }
    );

    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error accepting freelancer:", error);

    // Optional: Display user-friendly error messages
    if (error.response) {
      // Server responded with a status other than 2xx
      return `Error: ${error.response.data.message || "Request failed"}`;
    } else if (error.request) {
      // Request was made but no response received
      return "No response from server. Please try again.";
    } else {
      // Other errors
      return `Unexpected error: ${error.message}`;
    }
  }
};
