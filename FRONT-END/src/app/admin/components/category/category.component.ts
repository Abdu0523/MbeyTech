import { Component } from '@angular/core';
import { Category } from '../../../shared/interfaces/category';
import { createCategories, createCategory } from '../../../shared/data/category.generator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  public categoryCache!: Category[];
  public categories!: Category[];
  public category: Category = createCategory();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categories = createCategories(10);
    this.categoryCache = this.categories;
  }
}
