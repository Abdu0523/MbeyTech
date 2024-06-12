import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { PortailModule } from './portail/portail.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { interceptorInterceptor } from './core/interceptor/interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    PortailModule,
    HttpClientModule,
    FormsModule
  ],
  // providers: [ { provide: HTTP_INTERCEPTORS, useValue: interceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
