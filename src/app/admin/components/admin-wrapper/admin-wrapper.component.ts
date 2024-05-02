import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
// import './../../../../assets/admin/plugins/datatables/jquery.dataTables.min.js';
// import './../../../../assets/admin/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
// import './../../../../assets/admin/plugins/datatables-responsive/js/dataTables.responsive.min.js';
// import './../../../../assets/admin/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
// import './../../../../assets/admin/plugins/datatables-buttons/js/dataTables.buttons.min.js';
// import './../../../../assets/admin/plugins/datatables-buttons/js/buttons.bootstrap4.min.js';
// import './../../../../assets/admin/plugins/jszip/jszip.min.js';
// import './../../../../assets/admin/plugins/pdfmake/pdfmake.min.js';
// import './../../../../assets/admin/plugins/pdfmake/vfs_fonts.js';
// import './../../../../assets/admin/plugins/datatables-buttons/js/buttons.html5.min.js';
// import './../../../../assets/admin/plugins/datatables-buttons/js/buttons.print.min.js';
// import './../../../../assets/admin/plugins/datatables-buttons/js/buttons.colVis.min.js';

// import * as $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-bs4';
// import 'datatables.net-responsive-dt';

@Component({
  selector: 'app-admin-wrapper',
  templateUrl: './admin-wrapper.component.html',
  styleUrl: './admin-wrapper.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AdminWrapperComponent /*implements AfterViewInit*/ {
  constructor() {}

  // ngAfterViewInit(): void {
  //   $(function () {
  //     $('#example1')
  //       .DataTable({
  //         language: {
  //           search: 'Rechercher :',
  //         },
  //         responsive: true,
  //         lengthChange: false,
  //         autoWidth: false,
  //         // buttons: [
  //         //   { extend: 'copy', className: 'btn btn-primary' },
  //         //   { extend: 'csv', className: 'btn btn-primary' },
  //         //   { extend: 'excel', className: 'btn btn-primary' },
  //         //   { extend: 'pdf', className: 'btn btn-primary' },
  //         //   { extend: 'print', className: 'btn btn-primary' },
  //         //   { extend: 'colvis', className: 'btn btn-primary' },
  //         // ],
  //       })
  //       .buttons()
  //       .container()
  //       .appendTo('#example1_wrapper .col-md-6:eq(0)');
  //   });
  // }
}
