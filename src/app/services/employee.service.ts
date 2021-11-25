import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = "employees";

  constructor(
    private apiService: ApiService,
    private utilitiesService: UtilitiesService
  ) { }
  
  /**
   * Create New Employee 
   * @param newRequest 
   * @returns 
   */
  async create(newRequest: any) {
    return this.apiService.post(this.url, newRequest).then((response: any) => {
      if(response.status === "Success") {
        this.utilitiesService.openToast('Create Successfully', 'CREATE');
      }
      return response.data;
    }).catch((error: any) => {
      return error;
    })
  }

  /**
   * Get All Employee List
   * @returns 
   */
  async getAll(): Promise<any> {
    return this.apiService.get(this.url).then((response: any) => {
      return response.data;
    }).catch((error: any) => {
      return error;
    })
  }

  /**
   * Update Employee 
   * @param id 
   * @param data 
   * @returns 
   */
  async update(id: string | number, data: any) {
    return this.apiService.put(`${this.url}/${id}`, data).then((response: any) => {
      if(response.status === "Success") {
        this.utilitiesService.openToast('Edit Successfully', 'UPDATE');
      }
      return response.data;
    }).catch((error: any) => {
      return error;
    });
  }
}
