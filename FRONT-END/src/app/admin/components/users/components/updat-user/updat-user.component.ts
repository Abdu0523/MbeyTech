import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../shared/models/users';
import { UsersService } from '../../shared/services/users.service';

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
    if (this.user) {
      this.EditUserForm.patchValue(this.user);
    }
  }

  onSubmit(): void {
    if (this.EditUserForm.valid && this.user) {

      this.userService.updateUser(this.user._id, this.EditUserForm.value).subscribe(
        ()=>{
          this.userUpdated.emit();
          this.userService.refreshNeeded.next();
          this.EditUserForm.reset();
          //  $('#EditModal').modal('hide')

      });
    }

  }
}
