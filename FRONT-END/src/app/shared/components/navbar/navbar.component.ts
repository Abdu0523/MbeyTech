import { ChangeDetectorRef, Component, SimpleChanges } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  public nbrPanier: Number = 0;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.nbrPanier = cartItems.length;
      this.cdr.detectChanges();
      console.log('Cart updated, refreshing count 3',this.nbrPanier);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
