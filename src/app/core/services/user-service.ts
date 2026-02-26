import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto, UpdateUserProfileDto } from '../models/user-dto'

@Injectable({ providedIn: 'root' })
export class UserService {
  // Állítsd be a saját API URL-edet
  private apiUrl = 'https://localhost:4200/api/user'; 

  constructor(private http: HttpClient) {}


  getMyProfile(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/profile`);
  }

 
  updateProfile(data: UpdateUserProfileDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/profile`, data);
  }
}