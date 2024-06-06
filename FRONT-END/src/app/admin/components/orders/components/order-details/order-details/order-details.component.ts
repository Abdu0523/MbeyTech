import { Component, Input, SimpleChanges } from '@angular/core';
import { OrderDetailService } from '../../../../../../shared/services/order-detail/order-detail.service';
import { Order } from '../../../../../../shared/interfaces/order';
import { OrderDetail } from '../../../../../../shared/interfaces/order-detail';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  @Input() order!: Order;
  orderDetails: OrderDetail[] = [];
  constructor(private orderDetailService: OrderDetailService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getOrderDetailsForOrder(this.order._id);
    console.log('smbn : ', this.order);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['order'] && changes['order'].currentValue) {
      this.getOrderDetailsForOrder(this.order._id);
    }
  }

  getOrderDetailsForOrder(orderId: any) {
    this.orderDetailService
      .getOrderDetailsForOrder(orderId)
      .subscribe((orderDetails) => (this.orderDetails = orderDetails));
  }

  getTotal(): number {
    let total = 0;
    this.orderDetails.forEach((item) => {
      total += item.quantity * item.product[0].price;
    });
    return total;
  }

  generatePDF() {
    const doc = new jsPDF();

    doc.text('Détails de la commande', 14, 22);
    doc.text(`Facture #007612`, 14, 32);
    doc.text(`ID commande : ${this.order._id}`, 14, 42);
    doc.text(`Paiement effectué : 2/22/2014`, 14, 52);

    doc.text('Vers:', 14, 72);
    doc.text(`Nom: ${this.order.person[0].nomComplet}`, 14, 82);
    doc.text(`Adresse: ${this.order.person[0].adresse}`, 14, 92);
    doc.text(`Téléphone: ${this.order.person[0].phone}`, 14, 102);
    doc.text(`Email: ${this.order.person[0].email}`, 14, 112);

    const columns = [
      'Produit',
      'Quantité',
      'Prix unitaire',
      'Description',
      'Sous-total',
    ];
    const rows = this.orderDetails.map((item) => [
      item.product[0].name,
      item.quantity,
      item.product[0].price,
      item.product[0].description,
      (item.quantity * item.product[0].price).toFixed(2),
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 130,
    });

    const finalY = (doc as any).lastAutoTable.finalY;
    doc.text(`Total: ${this.getTotal().toFixed(2)} FCFA`, 14, finalY + 20);

    doc.save('facture.pdf');
  }

  printInvoice() {
    window.print();
  }
}
