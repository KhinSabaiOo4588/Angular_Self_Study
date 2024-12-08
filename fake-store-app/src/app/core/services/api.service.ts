import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'https://fakestoreapi.com';

  async get(endpoint: string) {
    const response = await axios.get(`${this.baseUrl}/${endpoint}`);
    return response.data;
  }

  async post(endpoint: string, data: any) {
    const response = await axios.post(`${this.baseUrl}/${endpoint}`, data);
    return response.data;
  }

  async put(endpoint: string, data: any) {
    const response = await axios.put(`${this.baseUrl}/${endpoint}`, data);
    return response.data;
  }

  async delete(endpoint: string) {
    const response = await axios.delete(`${this.baseUrl}/${endpoint}`);
    return response.data;
  }
}
