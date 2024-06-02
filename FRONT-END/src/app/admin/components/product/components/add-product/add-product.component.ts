import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceProductService } from '../../shared/services/service-product.service';
import { CategoryService } from '../../../../../shared/services/category/category.service';
import { Category } from '../../../../../shared/interfaces/category';
import { Observable } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  public productForm: FormGroup;
  public categories$: Observable<Category[]> | undefined;
  public imageUrl: string | ArrayBuffer | null = null;

  @Output() productAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private productService: ServiceProductService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['inactive', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categories$ = this.categoryService.getAllCategories();
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

  addProduct(): void {
    if (this.productForm.valid) {
      const productData: any = this.productForm.value;
      productData.status = productData.status === 'active' ? true : false; // Convertir la valeur du statut en boolean
      const formData = new FormData();
      for (let key in productData) {
        formData.append(key, productData[key]);
      }
      this.productService.addProduct(formData)
        .subscribe(() => {
          this.productAdded.emit();
          this.productForm.reset()
          $('#addProductModal').modal('hide');
        });
    }
  }
  
}
