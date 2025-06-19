import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  readonly url = "http://localhost:3001/Users";
  readonly medicalUrl = "http://localhost:3001/medicalDetails";

  constructor(private http: HttpClient) { }

  AddUpdateUsers(User: any): Observable<any> {
    return this.http.post(this.url, User);
  }

  GetAllUsers(): Observable<any> {
    return this.http.get(this.url);
  }
  DeleteUserByID(ID: string): Observable<any> {
    return this.http.delete(`${this.url}/${ID}`);
  }

  getMedicalDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.medicalUrl);
  }

  addMedicalDetail(detail: any): Observable<any> {
    return this.http.post<any>(this.medicalUrl, detail);
  }

  updateMedicalDetail(id: number, detail: any): Observable<any> {
    return this.http.put<any>(`${this.medicalUrl}/${id}`, detail);
  }

  deleteMedicalDetail(id: number): Observable<any> {
    return this.http.delete<any>(`${this.medicalUrl}/${id}`);
  }
}
