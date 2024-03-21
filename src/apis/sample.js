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
    }
}

export default SampleApi;