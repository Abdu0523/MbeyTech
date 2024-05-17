import { Component } from '@angular/core';
import { PanierService } from '../../services/panier/panier.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public nbrPanier: Number = 0;
  constructor(
    private panierService:  PanierService
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
}
