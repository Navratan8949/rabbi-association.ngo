import api from "./api";

// Create SiteContent
export const createSiteContent = async (data) => {
    try {
        const response = await api.post("/site-content", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get All SiteContents
export const getSiteContents = async (params) => {
    try {
        const response = await api.get("/site-content", { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get SiteContent by ID
export const getSiteContentById = async (id) => {
    try {
        const response = await api.get(`/site-content/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update SiteContent
export const updateSiteContent = async (id, data) => {
    try {
        const response = await api.put(`/site-content/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete SiteContent
export const deleteSiteContent = async (id) => {
    try {
        const response = await api.delete(`/site-content/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
