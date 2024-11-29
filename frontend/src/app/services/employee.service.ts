// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://167.172.146.37:3033/api';

  constructor(private http: HttpClient) { }

  createEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employes`, employee);
  }

  setEmployeeStatus(employeeId: number, statusId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/employe_status/create-employe-status`, {
      employe_id: employeeId,
      employe_status_id: statusId
    });
  }

  getEmployeeStatuses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employe_status`);
  }
}