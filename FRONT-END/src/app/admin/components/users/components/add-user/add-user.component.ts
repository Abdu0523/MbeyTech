import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  addUserForm: FormGroup;
  @Input() isEdit: boolean = false;
  @Input() user: any = null;
  @Output() addedUser: EventEmitter<void> = new EventEmitter<void>();


  constructor(private formBuilder: FormBuilder,
    private userService: UsersService) {

    this.addUserForm = this.formBuilder.group({
      nomComplet: ['', Validators.required],
      email: ['',[ Validators.required, Validators.email]],
      countryCode: ['', Validators.required],
      phone: ['', Validators.required],
      adresse: ['', Validators.required],
      password: ['',  [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      userType: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    // if (this.isEdit && this.user) {
    // if (this.isEdit && this.user) {
    //   this.addUserForm.patchValue(this.user);
    // }
  }
  getUser(user: any) {
    return this.addUserForm.get(user);
  }
  onSubmit(): void {
    if (this.addUserForm.valid) {
      // if(this.isEdit){
      //   this.userService.updateUser(this.addUserForm.value).subscribe(
      //     ()=>{
      //       this.userService.refreshNeeded.next();
      //     });
      // }else{
        const newUser = this.addUserForm.value;

        this.userService.addUser(newUser).subscribe(
          (user) => {
            console.log('Utilisateur ajouté avec succès :', user);
            this.addUserForm.reset();
            this.userService.refreshNeeded.next();
            this.addedUser.emit();
            Swal.fire("Utilisateur ajouté avec succès ");
            window.location.reload();

          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
            // Gérer l'erreur de manière appropriée, par exemple afficher un message à l'utilisateur
          }
        );
      }

  //   }
   }

}
