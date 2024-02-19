import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { FileUploaded } from '../models/file';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl + "/users";

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '?_sort=createdAt&_order=desc');
  }

  createUser(data: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, data);
  }

  updateUser(userId: string, data: User): Observable<User> {
    return this.httpClient.put<User>(this.baseUrl + `/${userId}`, data);
  }

  deleteUser(userId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.baseUrl + `/${userId}`)
  }

  uploadProfilePicture(file: File): Observable<FileUploaded> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpClient.post<FileUploaded>(environment.apiUrl + '/upload-file', formData, { headers });
  }
}
