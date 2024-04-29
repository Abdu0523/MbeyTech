import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';

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
}
