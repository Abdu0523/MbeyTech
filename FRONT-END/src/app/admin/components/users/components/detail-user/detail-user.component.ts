import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Users } from '../../shared/models/users';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.css'
})
export class DetailUserComponent {
  @Output() getDetails = new EventEmitter<any>();
  @Input() user!: Users;

  ngOnInit(): void {
    console.log('user', this.user)
  }

}
