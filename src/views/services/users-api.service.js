import http from "../../core/services/http-common";

export class UsersApiService {
  getAll() {
    return http.get("/users");
  }
  getByEmailAndPassword(email, password) {
    return http.get(`/users?email=${email}$password=${ password }`);
  }
  getById(id) {
    return http.get(`/users/${id}`);
  }
  create(data) {
    return http.post("/users", data);
  }
  update(id, data) {
    return http.put(`/users/${id}`, data);
  }
  delete(id) {
    return http.delete(`/users/${id}`);
  }
}