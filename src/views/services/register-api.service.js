import http from "../../core/services/http-common";

export class RegisterApiService {
  getAll() {
    return http.get("/countries");
  }
  getById(id) {
    return http.get(`/countries/${id}`);
  }
  create(data) {
    return http.post("/countries", data);
  }
  update(id, data) {
    return http.put(`/countries/${id}`, data);
  }
  delete(id) {
    return http.delete(`/countries/${id}`);
  }
}