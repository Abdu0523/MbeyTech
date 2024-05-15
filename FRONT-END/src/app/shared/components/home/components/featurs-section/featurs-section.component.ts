import { Component } from '@angular/core';
import { PanierService } from '../../../../services/panier/panier.service';

@Component({
  selector: 'app-featurs-section',
  templateUrl: './featurs-section.component.html',
  styleUrl: './featurs-section.component.css'
})
export class FeatursSectionComponent {
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
