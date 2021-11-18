import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './core/dashboard/dashboard.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MaterialModule } from './core/material.module';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { EffectsModule } from '@ngrx/effects';

const coreModules: any = [
  DashboardModule
];

@NgModule({
  declarations: [
    AppComponent,
    AccessDeniedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ...coreModules,
    EffectsModule.forRoot([])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
