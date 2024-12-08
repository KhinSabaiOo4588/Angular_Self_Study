// @HanNaungSoe Resorce services for CRUD

import { Injectable } from '@angular/core';
import { Resource } from '../../models/resource/resource.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

// apiUrl
const api = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private apiUrl = `${api}/resources`;


  constructor(private http: HttpClient) { }
  // get Resources
  getResources(): Promise<Resource[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Resource[]>(this.apiUrl).subscribe(
        (data) => {
          resolve(data);
          console.log(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // get Resource by Id number 
  getResourceById(id: number): Promise<Resource> {
    return new Promise((resolve, reject) => {
      this.http.get<Resource>(`${this.apiUrl}/${id}`).subscribe(
        (data) => resolve(data),
        (error) => reject(error)
      );
    });
  }

  // Create Resource Method
  createResource(resource: Resource): Promise<Resource> {
    return new Promise((resolve, reject) => {
      this.http.post<Resource>(this.apiUrl, resource).subscribe(
        (data) => resolve(data),
        (error) => reject(error)
      );
    });
  }


  // Delete Resource by Id
  deleteResource(id: number): Promise<Resource> {
    return new Promise((resolve, reject) => {
      this.http.delete<Resource>(`${this.apiUrl}/${id}`).subscribe(
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  }


  // update Resource By Id number
  updateResource(id: number, resource: Resource): Promise<Resource> {
    return new Promise((resolve, reject) => {
      this.http.put<Resource>(`${this.apiUrl}/${id}`, resource).subscribe(
        (data) => resolve(data),
        (error) => reject(error)
      );
    });
  }



}


