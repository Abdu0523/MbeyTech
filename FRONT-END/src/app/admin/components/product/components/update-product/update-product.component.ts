import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Products } from '../../shared/models/products';
import { ServiceProductService } from '../../shared/services/service-product.service';

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

  constructor(
    private productService: ServiceProductService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  updateProduct(): void {
    if (this.productForm.valid && this.product) {
      const productData = this.productForm.value;
      this.productService.updateProduct(this.product._id, productData).subscribe(() => {
        this.productUpdated.emit(); 
        this.productForm.reset(); 
        $('#updateProductModal').modal('hide');
      });
    }
  }
}
