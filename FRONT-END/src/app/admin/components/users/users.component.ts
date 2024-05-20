import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';
import { User } from '../../../shared/interfaces/user';
import { Users } from './shared/models/users';
import { UsersService } from './shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: Users[] = [];
  error: any
  
  constructor(private userService: UsersService){}

  ngOnInit(){
    this.getUser();
  }
  
  getUser(){
    this.userService.getAllUsers().subscribe(
      (user) => this.users = user,
      (error) => this.error = error
    )
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
       () => this.users = this.users.filter(item => item.id !== id),
      (error) => this.error = error
    );
  }
}
