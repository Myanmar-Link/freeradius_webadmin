import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

@Injectable({ providedIn: 'root'})
export class AuthService {

  public currentTokenSubject: BehaviorSubject<any>;
  public currentToken: Observable<any>;

  public currentPermissionSubject: BehaviorSubject<any>;
  public currentPermission: Observable<any>;

  constructor(
    private apiService: ApiService,
    private utilitiesService: UtilitiesService,
    private router: Router
  ) { 
    const token: any = localStorage.getItem('token');
    const permission: any = localStorage.getItem('permission');
    
    this.currentTokenSubject = new BehaviorSubject<any>(JSON.parse(token));
    this.currentToken = this.currentTokenSubject.asObservable();

    this.currentPermissionSubject = new BehaviorSubject<any>(JSON.parse(permission));
    this.currentPermission = this.currentPermissionSubject.asObservable();
  }

  public get currentTokenValue():string {
    return this.currentTokenSubject.value;
  }

  public get currentPermissionValue(): string {
    return this.currentPermissionSubject.value;
  }

  public login (email: string, password: string) {
    const request = {
      email_address: email,
      password: password
    }

    this.apiService.post('auth/employee/login', request).then((response: any) => {
      if(response.data) {

        let permission = {
          permission_name: response.data.permission.permission_name,
          read: response.data.permission.read,
          write: response.data.permission.write,
          edit: response.data.permission.edit,
          del: response.data.permission.delete
        }

        const permissionEncryption: string = this.utilitiesService.encrypt(permission);

        localStorage.setItem('permission', JSON.stringify(permissionEncryption));
        localStorage.setItem('token', JSON.stringify(response.data.token));

        this.currentTokenSubject.next(response.data.token);
        this.currentPermissionSubject.next(permission);

        // this.profile();

        this.router.navigate(['/dashboard']);
      }
    });
  }

  public profile() {
    this.apiService.get('auth/profile').then((response:any) => {
      // if(response.status !== 401) {
      //   localStorage.setItem('user', JSON.stringify(response))
      // }
    })
  }

  public logout() {
    localStorage.clear();
    this.currentTokenSubject.next(null);
    this.currentPermissionSubject.next(null);
    this.router.navigate(['/login']);
    return;
  }
}
