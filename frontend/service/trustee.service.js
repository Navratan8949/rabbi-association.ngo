import api from "./api";

// Get all trustees
export const getTrustees = async (params) => {
    try {
        const response = await api.get("/trustees", { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get single trustee
export const getTrusteeById = async (id) => {
    try {
        const response = await api.get(`/trustees/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Create trustee
export const createTrustee = async (data) => {
    try {
        const response = await api.post("/trustees", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update trustee
export const updateTrustee = async (id, data) => {
    try {
        const response = await api.put(`/trustees/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete trustee
export const deleteTrustee = async (id) => {
    try {
        const response = await api.delete(`/trustees/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

