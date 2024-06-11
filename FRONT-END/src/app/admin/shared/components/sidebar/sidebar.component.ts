import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../shared/interfaces/user';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})

export class SidebarComponent /*implements AfterViewInit*/ {
  // @ViewChild('parentLink', { static: true }) parentLink!: ElementRef; // Utilisation de "!" pour indiquer que cette propriété sera initialisée

  // constructor(private router: Router) {}

  // ngAfterViewInit() {
  //   this.router.events.subscribe((event: RouterEvent) => {
  //     if (event instanceof NavigationEnd) {
  //       const currentUrl = event.url;
  //       if (currentUrl.split('/').length > 2) {
  //         this.activateParentModule();
  //       }
  //     }
  //   });
  // }

  // activateParentModule() {
  //   if (this.parentLink) { // Vérifier si parentLink est défini
  //     this.parentLink.nativeElement.classList.add('active');
  //   }
  // }

  user!: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.user);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
