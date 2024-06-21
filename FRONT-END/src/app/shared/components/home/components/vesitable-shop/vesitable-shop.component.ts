import { Component, OnInit } from '@angular/core';
import { ServiceProductService } from '../../../../../admin/components/product/shared/services/service-product.service';
import { Product } from '../../../../../admin/components/product/shared/models/products';
import { CrudchampService } from '../../../../../admin/components/champ/servicechamp/crudchamp.service';

@Component({
  selector: 'app-vesitable-shop',
  templateUrl: './vesitable-shop.component.html',
  styleUrl: './vesitable-shop.component.css',
})
export class VesitableShopComponent implements OnInit {
  public champs:any=[];
  statut=['Activer','Desactiver'];
  typechamp=['Location','Vente'];

  responsiveOptions: any[] | undefined;

  constructor(private crud:CrudchampService) {}

  ngOnInit() {
    this.getlistchamp();
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getSeverity(status: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'danger';
      default:
        return 'secondary'; // Valeur par défaut
    }
  }

  getlistchamp(){
    this.champs=[];
    this.crud.getBystatut(this.statut[0]).subscribe((data:any)=>{
      this.champs=data;
    });
  }
}
