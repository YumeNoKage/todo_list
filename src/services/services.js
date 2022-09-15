import axios from 'axios';

export const getData = async (url, params) => {
    try {
        if (params.email) {
            const data = await axios.get(url, {params:{
                'email': params.email
            }});
            return data
        } else {
            const data = await axios.get(url, params);
            return data
        }
    } catch (error) {
        return {
            status: 'error',
            ...error
        }
    }
}

export const postData = async(url, params) => {
    try {
        if (params.email) {
            const data = await axios.post(url, params, {params:{
                email: params.email
            }});
            return data
        } else {
            const data = await axios.post(url, params);
            return data
        }
    } catch (error) {
        return {
            status: 'error',
            ...error
        }
    }
}

export const deleteData = async(url, params) => {
    try {
        if (params.email) {
            const data = await axios.delete(url, params, {params:{
                email: params.email
            }});
            return data
        } else {
            const data = await axios.delete(url, params);
            return data
        }

    } catch (error) {
        return {
            status: 'error',
            ...error
        }
    }
}

export const updateData = async(url, params) => {
    try {
        if (params.email) {
            const data = await axios.patch(url, params, {params:{
                email: params.email
            }});
            return data
        } else {
            const data = await axios.patch(url, params);
            return data
        }
    } catch (error) {
        return {
            status: 'error',
            ...error
        }
    }
}