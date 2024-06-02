import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Products } from '../../shared/models/products';
import { ServiceProductService } from '../../shared/services/service-product.service';
import { CategoryService } from '../../../../../shared/services/category/category.service';
import { Category } from '../../../../../shared/interfaces/category';
import { Observable } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  @Input() product: Products | null = null;
  @Output() productUpdated: EventEmitter<void> = new EventEmitter<void>();
  productForm: FormGroup;
  public categories$: Observable<Category[]> | undefined;
  public imageUrl: string | ArrayBuffer | null = null;

  constructor(
    private productService: ServiceProductService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.productForm = this.formBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      image: [''],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();

  }

  loadCategories(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.categories$.subscribe(categories => {
      if (this.product && categories) {
        this.productForm.patchValue(this.product);
        this.imageUrl = this.product.image;
        // Trouver la catégorie du produit dans la liste des catégories
        const selectedCategory = categories.find(category => category._id === this.product!.category[0]._id);
        if (selectedCategory) {
          // Définir la catégorie du produit comme sélectionnée
          this.productForm.get('category')?.setValue(selectedCategory._id);
        }
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.productForm.patchValue({ image: file });
    this.productForm.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    }
    reader.readAsDataURL(file);
  }

  updateProduct(): void {
    if (this.productForm.valid && this.product) {
      const productData = this.productForm.value;
      // this.productService.updateProduct(this.product._id, productData).subscribe(() => {
      //   this.productUpdated.emit();
      //   this.productForm.reset();
      //   $('#updateProductModal').modal('hide');
      // });
      const formData = new FormData();
      for (let key in productData) {
        formData.append(key, productData[key]);
      }
      if (this.product._id) {
        this.productService.updateProduct(this.product._id, formData).subscribe(() => {
          this.productUpdated.emit();

          this.productForm.reset();
          $('#updateProductModal').modal('hide');
          window.location.reload();
        });
      }
    }
  }
}
