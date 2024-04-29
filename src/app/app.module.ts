import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { PortailModule } from './portail/portail.module';
import { AuthService } from './core/components/services/auth.service';
import { CoreModule } from './core/core.module';
import { RegisterComponent } from './core/components/register/register.component';


@NgModule({
  declarations: [AppComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    PortailModule,
    CoreModule,
    FormsModule 
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
