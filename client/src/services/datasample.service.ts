import http from "../http-common";

class DataSampleService {
    getAll() {
        return http.get("/datasamples");
    }

    get(id: number) {
        return http.get(`/datasamples/${id}`);
    }

    // create(data: DataSample) {
    //     return http.post("/datasamples", data);
    // }

    // update(id: string, data: DataSample) {
    //     return http.put(`/datasamples/${id}`, data);
    // }

    // delete(id: string) {
    //     return http.delete(`/datasamples/${id}`);
    // }

    // deleteAll() {
    //     return http.delete(`/datasamples`);
    // }

    // findByTitle(title: string) {
    //     return http.get(`/datasamples?title=${title}`);
    // }
}

export default new DataSampleService();