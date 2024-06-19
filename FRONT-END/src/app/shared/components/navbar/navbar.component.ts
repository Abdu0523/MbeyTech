import { Component } from '@angular/core';
import { PanierService } from '../../services/panier/panier.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public nbrPanier: Number = 0;
  constructor(
    private panierService:  PanierService,private authService: AuthService, private router: Router
  ) {}
  ngOnInit() {
    this.getNombrePanier()
    this.panierService.RequiredRefresh.subscribe(() => {
      this.getNombrePanier();
        });
  }

  getNombrePanier(){
    this.nbrPanier = this.panierService.getCart().length
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
