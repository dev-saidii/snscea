import API from "@/lib/axios";
import { MarksheetInput } from "@/types/marksheet";

export const issueMarksheet = async (data: MarksheetInput) => {
    try {
        const res = await API.post("/api/marksheet", data);
        if (!res.data) {
            throw new Error("Failed to issue marksheet");
        }

        return res.data.marksheet;
    } catch (error) {
        throw new Error(error.message || "Something went wrong");
    }
};

export const getMarksheets = async (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    const res = await API.get(`/api/marksheet?${queryParams}`);
    // console.log(res.data)
    return res.data;
};

export async function deleteMarksheetById(id: string) {
    try {
        const res = await API.delete(`/api/marksheet/${id}`);
        return res.data;
    } catch (err) {
        throw new Error(err?.response?.data?.error || "Delete failed");
    }
}
