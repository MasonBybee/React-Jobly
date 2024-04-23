import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const newToken = localStorage.getItem("token");

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token = newToken;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  static async createCompany(data) {
    let res = await this.request(`companies`, data, "post");
  }

  static async getCompanies(data) {
    let res = await this.request(`companies/`, data);
    return res.companies;
  }

  static async updateCompany(handle, data) {
    let res = await this.request(`companies/${handle}`, data, "patch");
    return res.company;
  }

  static async deleteCompany(handle) {
    let res = await this.request(`companies/${handle}`, {}, "delete");
    return res;
  }

  static async createJob(data) {
    let res = await this.request(`jobs`, data, "post");
    return res.job;
  }

  static async getJobs(data) {
    let res = await this.request(`jobs`, data);
    return res.jobs;
  }

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  static async updateJob(id, data) {
    let res = await this.request(`jobs/${id}`, data, "patch");
    return res.job;
  }

  static async deleteJob(id) {
    let res = await this.request(`jobs/${id}`, {}, "delete");
    return res;
  }

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    this.token = res.token;
    return res.token;
  }

  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    this.token = res.token;
    return res.token;
  }

  static async createUser(data) {
    let res = await this.request(`users`, data, "post");
    return res.token;
  }

  static async getUsers() {
    let res = await this.request(`users`);
    return res.users;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, "delete");
    return res;
  }

  static async applyForJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res;
  }
}

export default JoblyApi;
