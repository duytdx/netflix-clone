import { toast } from "react-toastify";
import  Axios  from "./Axios.jsx";

const uploadImageService = async (file, setLoading) => {
    try {
        setLoading(true);
        const {data} = await Axios.post("/upload", file);
        setLoading(false);
        toast.success("Image uploaded successfully");
        return data;
    } catch (error) {
        setLoading(false);
        toast.error("Image upload failed");
        throw error;
    }
}

export default uploadImageService;
