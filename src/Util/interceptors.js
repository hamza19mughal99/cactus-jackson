import axios from "axios";
import { getRefreshToken, getToken, updateLocalAccessToken } from "./helper";

const instance = axios.create({
    baseURL: 'https://cactus-jack.azurewebsites.net/api',
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/" && err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await instance.post('auth/refreshtoken', {
                        refreshToken: getRefreshToken(),
                    });

                    const { accessToken } = rs?.data?.data;
                    updateLocalAccessToken(accessToken)

                    return instance(originalConfig);
                } catch (_error) {
                    localStorage.clear()
                    window.location.pathname = '/login'
                }
            }
        }
        return Promise.reject(err);
    }
);
export default instance;