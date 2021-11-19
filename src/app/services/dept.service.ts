import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

export interface department{
  [x: string]: any;
  id:number;
  deptartment_name:string;
  created_at: string;
  updated_at:string;
}

@Injectable({
  providedIn: 'root'
})
export class DeptService {

  dept: department [] = [];

  constructor(
    private apiService: ApiService,
    private utilitiesService: UtilitiesService,
    private router: Router
  ) { }

  public createDepartment(departmentName:string){
    const request = {
      department_name : departmentName
    }
    
    this.apiService.post('departments',request).then((response:any) => {
      if(response.data){
        this.utilitiesService.openToast('Department Successfully create');
      }
    });
  } 
  public getDepartment(){
    return this.apiService.get('departments').then((response:any) => {
      if(response.data){
        return response.data;
      }
    });
  }
}
