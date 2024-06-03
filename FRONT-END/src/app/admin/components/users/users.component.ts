import { Component } from '@angular/core';
import { Users } from './shared/models/users';
import { UsersService } from './shared/services/users.service';
//import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: Users[] = [];
  user: any;
  error: any
  isEdit: boolean = false;
  showElement: boolean = false;
  selectedUser: any = null;

  constructor(private userService: UsersService){}

  ngOnInit(){
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getAllUsers().subscribe(
      (user: any) => {
        this.users = user
        console.log('this.users', this.users)
      }
      ,
      (error) => this.error = error
    )
  }
  userAdded(){
    this.loadUsers();
  }

  // deleteUser(id: number): void {
  //   this.userService.deleteUser(id).subscribe(
  //      () =>{
  //        this.users = this.users.splice(id, 1)
  //        this.refreshElement();
  //      }
  //       // this.users.filter(item => item.id !== id)
  //       ,
  //     (error) => this.error = error
  //   );
  // }
  refreshElement(): void {
    this.showElement = false; // Cacher l'élément
    setTimeout(() => {
      this.showElement = true; // Réafficher l'élément après un délai
    }, 1000); // Délai en millisecondes (par exemple, 1 seconde)
  }

  getDetails(id:number){

    this.userService.getbyIdUsers(id)
      .subscribe(
        (user) => (this.user = user,
         console.log('this.user', this.user)
        )
      );
  }
  openAddModal() {
    this.isEdit = false;
    this.selectedUser = null;
  }

  openEditModal(user: any) {
    this.isEdit = true;
    this.selectedUser = user;
    const modalElement = document.getElementById('userModal');
    // const modal = new bootstrap.Modal(modalElement);
    // modal.show();
  }
}
