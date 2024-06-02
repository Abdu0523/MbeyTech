import { UserService } from './../../../../../shared/services/user/user.service';
import { Component, Input } from '@angular/core';
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
deleteUser(id: number): void {
  this.userService.deleteUser(id).subscribe(
     () =>{
       this.users = this.users.splice(id, 1)
       this.userService.refreshNeeded.next();
     }
      // this.users.filter(item => item.id !== id)
      ,
    (error) => this.error = error
  );
}
}
