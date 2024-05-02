import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceProductService } from '../../shared/services/service-product.service';

declare var $: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  public productForm: FormGroup;

  @Output() productAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private productService: ServiceProductService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const productData: any = this.productForm.value;
      this.productService.addProduct(productData)
        .subscribe(() => {
          this.productAdded.emit();
          this.productForm.reset()
          $('#addProductModal').modal('hide');
        });
    }
  }
}
