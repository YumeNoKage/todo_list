import axios from 'axios';

export const getData = async (url, params) => {
    try {
        const data = await axios.get(url, params);

        return data
    } catch (error) {
        return {
            status: 'error',
            ...error
        }
    }
}

export const postData = async(url, params) => {
    try {
        const data = await axios.post(url, params);

        return data
    } catch (error) {
        return {
            status: 'error',
            ...error
        }
    }
}

export const deleteData = async(url, params) => {
    try {
        const data = await axios.delete(url, params);

        return data
    } catch (error) {
        return {
            status: 'error',
            ...error
        }
    }
}