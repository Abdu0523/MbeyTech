import { Component, ElementRef, ViewChild } from '@angular/core';
import { Category } from '../../../shared/interfaces/category';
import { CategoryService } from '../../../shared/services/category/category.service';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'jquery';
import { UpdateCategoryComponent } from './components/modal/update-category/update-category.component';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  public categoryCache!: Category[];
  public categories!: Category[];
  public category!: Category;
  @ViewChild(UpdateCategoryComponent)
  updateCategoryComponent!: UpdateCategoryComponent;
  // @ViewChild('updateCategoryModal') updateCategoryModal!: NgbModalRef;
  // private modalRef!: NgbModalRef;
  public categoryId!: string;
  public user!: User;

  constructor(
    private categoryService: CategoryService // private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategories();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getCategories(): void {
    this.categoryService
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  getCategoryById(id: any): void {
    this.categoryService
      .getCategoryById(id)
      .subscribe((category) => (this.category = category));
  }

  onCategoryAdded(newCategory: { nom: string; image: File }) {
    this.categoryService
      .addCategory(newCategory.nom, newCategory.image)
      .subscribe(
        (category: Category) => {
          this.getCategories();
          // $('#add-category').hide();
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
  }

  onCategoryUdated(category: { _id: string; nom: string; image: File }) {
    this.categoryService
      .updateCategory(category._id, category.nom, category.image)
      .subscribe(
        (category: Category) => {
          this.getCategories();
        },
        (error) => {
          console.error('Error update category : ', error);
        }
      );
  }

  onCategoryDeleted() {
    this.categoryService.delete(this.categoryId).subscribe(
      (category: Category) => {
        this.getCategories();
      },
      (error) => {
        console.error('Error delete category:', error);
      }
    );
  }

  getId(id: any) {
    this.categoryId = id;
  }
}
