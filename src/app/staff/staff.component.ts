import { Component, OnInit } from '@angular/core';
import { Staff } from './staff';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  listStaff: Staff[] = [
    new Staff('nv01', 'Phạm Văn Cương', 'cuonglxkm@gmail.com', '0961080526', 'Hoàng Mai, Hà Nội'),
    new Staff('nv02', 'Hải tc', 'haitc@gmail.com', '0303030303', 'Minh Khai, Hà Nội'),
    new Staff('nv03', 'Sơn', 'son@gmail.com', '13123123312', 'Hoàng Mai, Hà Nội'),
    new Staff('nv04', 'Thái', 'tuan@gmail.com', '123123', 'Hoàng Mai, Hà Nội'),
    new Staff('nv05', 'Tuấn', 'tuan@gmail.com', '12213123', 'Hoàng Mai, Hà Nội')
  ];

  constructor() { }

  ngOnInit() {
  }
  onClick(event) {
    console.log(event);
    return false;
  }
}
