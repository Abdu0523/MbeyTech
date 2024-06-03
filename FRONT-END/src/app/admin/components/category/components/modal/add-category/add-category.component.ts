import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormMaker } from '../../../../../shared/interfaces/form-maker';
import { FileService } from '../../../../../../shared/services/file/file.service';
declare var $: any;
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  @Output() categoryAdded: EventEmitter<{ nom: string; image: File }> =
    new EventEmitter<{ nom: string; image: File }>();

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl(''),
  });

  formMaker: FormMaker[] = [
    {
      name: 'Nom de la catégorie',
      key: 'name',
      type: 'text',
      control: this.categoryForm.get('name') as FormControl,
    },
    {
      name: 'Image descriptive de la catégorie',
      key: 'image',
      type: 'file',
      control: this.categoryForm.get('image') as FormControl,
    },
  ];

  isSubmit: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private fileService: FileService
  ) {}

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log('info: ', this.categoryForm.value);
      const nom = this.categoryForm.get('name')?.value;
      const image = this.fileService.getFile();
      if (image && nom) {
        this.categoryAdded.emit({ nom, image });
        $('#add-category').modal('hide');
        this.closeModal();
      }
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileService.setFile(file);
  }

  private initForm() {
    this.categoryForm.get('name')?.setValue('');
    this.categoryForm.get('image')?.setValue('');
  }

  closeModal() {
    this.initForm()
  }
}
