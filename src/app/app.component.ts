import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { sideMenu } from './constants/navigation';
import { CHILDREN_MENU, MENU } from './models/menu.model'
import { PERMISSION } from './models/permission.model';
import { AuthService } from './services/auth.service';
import { UtilitiesService } from './services/utilities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  isLogged: boolean = false;
  showFiller: boolean = false;
  appMenu: MENU[] = sideMenu;
  permission: PERMISSION = {
    read: false,
    write: false,
    edit: false,
    del: false
  }

  constructor(
    private authService: AuthService,
    private utilitiesService: UtilitiesService,
    private store: Store<any>,
    private route: Router
  ) { }

  link(page: any) {
    return this.route.navigateByUrl(page.url, {
      state: page
    });
  }

  ngOnInit(): void {
    this.authService.currentTokenSubject.subscribe((token: string) => {

      if(token === null) {
        this.isLogged = false;
        return;
      }

      if(token) {
        this.isLogged = true;
        return;
      }
    });

    if(this.isLogged) {
      this.authService.currentPermissionSubject.subscribe((result: PERMISSION) => {
        if(result === null) {
          this.route.navigate(['access-denied'])
          return;
        }

        const getPermission = this.utilitiesService.decrypt(result);

        this.appMenu.map((value: MENU) => {
          value.children.map((children: CHILDREN_MENU) => {
            children.permission = JSON.parse(getPermission)
          })
        })
      });
    }
  }
}
