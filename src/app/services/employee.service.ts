import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private apiService: ApiService
  ) { }


  getAllEmployee() {
    return this.apiService.get('departments').then((response: any) => {
      return response.data;
    })
  }
}
