import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private apiService: ApiService
  ) { }

  create() {
  }
}
