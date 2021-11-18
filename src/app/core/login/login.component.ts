import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private snackbarCtrl: MatSnackBar,
    private authService: AuthService
  ) { }

  openSnackBar(message: string, action: string) {
    return this.snackbarCtrl.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

  submit() {
    if(this.email === '' || this.password === '') {
      return this.openSnackBar('All fields are required', 'Error');
    }

    this.authService.login(this.email, this.password);
    return;
  }

  ngOnInit(): void {
  }
  

}
