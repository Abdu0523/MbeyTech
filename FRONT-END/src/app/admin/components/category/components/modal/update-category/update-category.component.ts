import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileService } from '../../../../../../shared/services/file/file.service';
import { FormMaker } from '../../../../../shared/interfaces/form-maker';
import { Category } from '../../../../../../shared/interfaces/category';

declare var $ : any;

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css',
})
export class UpdateCategoryComponent {
  @Output() categoryUpdated: EventEmitter<{
    _id: string;
    nom: string;
    image: File;
  }> = new EventEmitter<{ _id: string; nom: string; image: File }>();

  @Input() category!: Category;

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

  constructor(private fileService: FileService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category'] && changes['category'].currentValue) {
      this.categoryForm.patchValue({
        name: this.category.nom,
        image: this.category.image,
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const nom = this.categoryForm.get('name')?.value;
      const image = this.fileService.getFile();
      console.log(nom, image);
      if (image && nom) {
        const _id = this.category._id;
        this.categoryUpdated.emit({ _id, nom, image });

        this.resetForm();
        $('#update-category-modal').modal('hide');
        
      }
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileService.setFile(file);
  }

  resetForm() {
    this.categoryForm.get('name')?.setValue('');
    this.categoryForm.get('image')?.setValue('');
  }
}
