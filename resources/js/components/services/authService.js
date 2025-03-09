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
        return res.data;
    } catch (error) {
        console.error("Error fetching user", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await apiService.post("/logout");
        localStorage.removeItem("token");
    } catch (error) {
        console.error("Logout Failed:", error);
    }
};
