import API from '@/lib/axios';

export const studentAdmission = async (data) => {
    const res = await API.post('/api/admissions/', data);
    // console.log(res)
    return res.data;
};


