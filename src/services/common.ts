import API from "@/lib/axios";
import axios from "axios";

export const uploadPhoto = async (photo: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", photo);

    const { data } = await axios.post("http://localhost:8000/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data?.url ?? null;
};


export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await API.post('/api/upload', formData);
    console.log(data.url);
    return data.url;
}

