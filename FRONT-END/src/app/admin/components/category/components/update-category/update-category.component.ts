import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormMaker } from '../../../../shared/interfaces/form-maker';
import { FileService } from '../../../../../shared/services/file/file.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css',
})
export class UpdateCategoryComponent {
  @Output() categoryUpdated: EventEmitter<{ nom: string; image: File }> =
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

  @ViewChild('updateCategoryModal') updateCategoryModal!: ElementRef;

  constructor(
    private fileService: FileService,
  ) {}

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log('info: ', this.categoryForm.value);
      const nom = this.categoryForm.get('name')?.value;
      const image = this.fileService.getFile();
      if (image && nom) {
        this.categoryUpdated.emit({ nom, image });
        // this.closeModal();
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
}
