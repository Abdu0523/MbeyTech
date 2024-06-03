import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user/user.service';
import { UsersService } from '../../../admin/components/users/shared/services/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  addUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UsersService) {

    this.addUserForm = this.formBuilder.group({
      nomComplet: ['', Validators.required],
      email: ['',[ Validators.required, Validators.email]],
      countryCode: ['', Validators.required],
      phone: ['', Validators.required],
      adresse: ['', Validators.required],
      password: ['', Validators.required],
      userType: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      const newUser = this.addUserForm.value;
      this.userService.addUser(newUser).subscribe(

        (user) => {
          console.log('Utilisateur ajouté avec succès :', user);
          // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires
          this.addUserForm.reset();
          Swal.fire("Utilisateur ajouté avec succès ");
          // router

        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
          // Gérer l'erreur de manière appropriée, par exemple afficher un message à l'utilisateur
        }
      );
    }
  }
}
