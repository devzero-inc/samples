import axios from "axios";

class AxiosService {
    static async get(url) {
        try {
            const response = await axios.get(url);
            return response;
        } catch (error) {
            console.error('AxiosService Error:', error);
        }
    }
}

export default AxiosService;
