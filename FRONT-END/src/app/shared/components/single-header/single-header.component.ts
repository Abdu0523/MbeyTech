import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-header',
  templateUrl: './single-header.component.html',
  styleUrl: './single-header.component.css'
})
export class SingleHeaderComponent {
  @Input() pageTitle: string = 'pageTitle';

}
