import { Component } from '@angular/core';
import { Product } from '../../../admin/components/product/shared/models/products';
import { Router } from '@angular/router';
import { PanierService } from '../../services/panier/panier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  public products!: Product[];
  public quantity: number = 1;
  public totalPrice: number = 1;
  public livraison:number = 40000;


  constructor(
    private router: Router,
    private panierService: PanierService
  ) {}
  ngOnInit() {
   this.getAllPanier()
   this.calculateTotal()
   this.panierService.RequiredRefresh.subscribe(()=>{
    this.getAllPanier()
    this.calculateTotal()
   })
  }

  calculateTotal() {
    this.totalPrice = this.products.reduce((acc, product) => {
      return acc + (product.quantity * product.price);
    }, 0);
  }
  getAllPanier(){
    this.products = this.panierService.getCart();
  }
  navigateToVcommande() {
    this.router.navigate(['/vcommande']);
    console.log("checkout tap")
}
addCommande() {
  this.panierService.clearCart().subscribe({
    next: () => {
      this.showAlert()
      this.router.navigate(['/home']);

    },
    error: (error) => {
     this.alertError()
    }
  });
}
// removeFromCart(productId: string) {
//   Swal.fire({
//     title: 'Êtes-vous sûr ?',
//     text: 'Vous ne pourrez pas revenir en arrière !',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Oui, supprimez-la !'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       this.panierService.removeFromCart(productId).subscribe({
//         next: () => {
//           this.showAlert()
//         },
//         error: (error) => {
//          this.alertError()
//         }
//       });
//     }
//   });
// }
alertError(){
  Swal.fire({
    title: 'Oops!',
    text: 'Un problème s est produit lors de la suppression du produit.',
    icon: 'error'
  });
}
showAlert() {
  Swal.fire({
    title: "Commande ajoute avec succès!",
    text: "Vous avez cliqué sur le bouton pour explorer les autres produits",
    icon: "success"
  });
}
alertSuccess(){
  Swal.fire({
    title: 'Supprimé !',
    text: 'Le produit a été retiré.',
    icon: 'success'
  });
}
}
