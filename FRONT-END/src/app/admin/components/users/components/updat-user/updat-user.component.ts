import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../shared/models/users';
import { UsersService } from '../../shared/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updat-user',
  templateUrl: './updat-user.component.html',
  styleUrl: './updat-user.component.css'
})
export class UpdatUserComponent {
  @Input() user: Users | null =null;
  @Output() userUpdated: EventEmitter<void> = new EventEmitter<void>();
  EditUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UsersService) {

    this.EditUserForm = this.formBuilder.group({
      _id: [''],
      nomComplet: ['', Validators.required],
      email: ['',[ Validators.required, Validators.email]],
      countryCode: ['', Validators.required],
      phone: ['', Validators.required],
      adresse: ['', Validators.required],
      password: ['', Validators.required],
      userType: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    // console.log('this.user5555', this.user);

    if (this.user) {
      this.EditUserForm.patchValue(this.user);
    }
  }

  onSubmit(): void {
    console.log('this.user5555',typeof(this.user?._id));
    console.log('this.EditUserForm.value',typeof(this.EditUserForm.value));
    if (this.EditUserForm.valid && this.user) {
      if(this.user._id){
        this.userService.updateUser(this.EditUserForm.value, this.user._id).subscribe(
          ()=>{
            // this.userUpdated.emit();
            this.userService.refreshNeeded.next();
            this.EditUserForm.reset();
            Swal.fire({
              icon: "success",
              title: "Utilisateur modifié avec succès",
              showConfirmButton: false,
              timer: 1500
            });
            window.location.reload();

        });
      }
    }

  }
}
