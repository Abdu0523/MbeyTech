import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Users } from '../../shared/models/users';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-item-user',
  templateUrl: './item-user.component.html',
  styleUrl: './item-user.component.css'
})
export class ItemUserComponent {
@Input() users: Users[]=[];

userId!: string;
error!: string;

constructor(private userService: UsersService){}
ngOnInit(){
  this.loadUsers();

}

loadUsers(){
  this.userService.getAllUsers().subscribe(
    (users: any) => {
      this.users = users
      console.log('this.users', this.users)
    },
    (error) => this.error = error
  )
}
toggleUserStatus(user: any): void {
  if (user.statut) {
    this.userService.deactivateUser(user._id).subscribe(response => {
      user.statut = false;
    });
  } else {
    this.userService.activateUser(user._id).subscribe(response => {
      user.statut = true;
    });
  }
}
deleteUser(id: string): void {
  Swal.fire({
    title: "Etes vous sure de vouloir supprimer cette utilisateur?",
    text: "cet action est irreversible",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Oui, supprime le!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.deleteUser(id).subscribe(
        () =>{
          // this.users = this.users.splice(id, 1)
          // this.userService.refreshNeeded.next();
          Swal.fire({
            title: "Supprimer!",
            text: "Votre utilisateur est supprimee.",
            icon: "success"
          });
          window.location.reload();
        });

    }
  });

}

}
