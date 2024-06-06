import { Component } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-vcommande',
  templateUrl: './vcommande.component.html',
  styleUrl: './vcommande.component.css'
})
export class VcommandeComponent {
  public categories!: Category[];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
  }
}
