import DMWAxiosClient from "./base"

const SampleApi = {
    getAll:  ({number, page}) => {
        return DMWAxiosClient.get(`/getallsample/?number=${number}&page=${page}`)
    },
    uploadSample: (formData) => {
        return DMWAxiosClient.post(`/uploadsample/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    getByHash: (hash) => {
        return DMWAxiosClient.get(`/getsample/${hash}`);
    },
    analysSample: (data) => {
        return DMWAxiosClient('/analysis/',{
            method: 'POST',
            data
        })
    }
}

export default SampleApi;