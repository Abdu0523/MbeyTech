import { Component, EventEmitter, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.css',
})
export class DeleteCategoryComponent {
  @Output() categoryDeleted = new EventEmitter<any>();

  onSubmit() {
    this.categoryDeleted.emit();
    $('#delete-category-modal').modal('hide');
  }
}
