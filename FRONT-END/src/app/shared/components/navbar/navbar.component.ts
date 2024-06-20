import { Component, SimpleChanges } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
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
    private cartService:  CartService,private authService: AuthService, private router: Router
  ) {}

  ngOnInit() {
    this.getNombrePanier()
    this.cartService.RequiredRefresh.subscribe(() => {
      this.getNombrePanier();
        });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['nbrPanier'] && changes['nbrPanier'].currentValue) {
      this.getNombrePanier();
    }
  }

  getNombrePanier(){
    this.nbrPanier = this.cartService.getCart().length
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
