import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto, UpdateUserProfileDto } from '../models/user-dto'

@Injectable({ providedIn: 'root' })
export class UserService {
  // Állítsd be a saját API URL-edet
  private apiUrl = 'https://localhost:4200/api/user'; 

  constructor(private http: HttpClient) {}
getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/get-all`);
  }

  /**
   * 2. Felhasználó törlése ID alapján
   */
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  /**
   * 3. Felhasználó szerepkörének módosítása
   * @param id A felhasználó azonosítója
   * @param newRole Az új szerepkör (User, Host, Admin)
   */
  updateUserRole(id: number, newRole: string): Observable<any> {
    // A backend kialakításától függően lehet PUT vagy PATCH. 
    // Itt egy DTO-t küldünk a body-ban az új szerepkörrel:
    return this.http.put(`${this.apiUrl}/update-role/${id}`, { role: newRole });
  }

  getMyProfile(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/profile`);
  }

 
  updateProfile(data: UpdateUserProfileDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/profile`, data);
  }
}