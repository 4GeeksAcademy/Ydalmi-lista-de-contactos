export const API_BASE_URL = "https://playground.4geeks.com/contact/agendas/";

export const LIST_NAME = "ydalmi";

export const getApiUrl = (endpoint = "") => {
    return `${API_BASE_URL}${LIST_NAME}${endpoint}`;
};