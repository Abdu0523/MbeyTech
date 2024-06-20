import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-order-actions',
  templateUrl: './order-actions.component.html',
})
export class OrderActionsComponent {
  @Output() emitter = new Subject<{ action: string, order: any }>();
  @Input() order: any;

  onAction1() {
    this.emitter.next({
      action: 'view',
      order: this.order,
    });
  }

  ngOnDestroy() {
    this.emitter.unsubscribe();
  }
}
