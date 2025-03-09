import apiService from "./apiService";

export const register = (userData) => {
    console.log("Token:", localStorage.getItem("token"));
    console.log("Payload:", userData);
    return apiService.post("/register", userData);
};

export const login = async (userData) => {
    const res = await apiService.post("/login", userData);
    localStorage.setItem("token", res.data.token);

    return res.data;
};

export const getUser = async () => {
    try {
        const res = await apiService.get("/user");
        console.log("API Response:", res.data); // ✅ Log response
        return res.data;
    } catch (error) {
        console.error("Error fetching user:", error.response?.data || error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await apiService.get("/logout");
        localStorage.removeItem("token");
    } catch (error) {
        console.error("Logout Failed:", error);
    }
};
