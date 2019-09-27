import { Component, OnInit } from '@angular/core';
import { Staff } from './staff';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgForm } from '@angular/forms'

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
  isSearch = false;
  searchString = '';
  listSearch = [];
  isVisible = false;
  newStaff: Staff;

  constructor(private modalService: NzModalService) { }

  ngOnInit() {
    this.listSearch = JSON.parse(JSON.stringify(this.listStaff));
  }



  onClick() {
    if (this.searchString !== '') {
      let data = this.listStaff.filter(x =>
        x.id.indexOf(this.searchString) !== -1 ||
        x.name.indexOf(this.searchString) !== -1 ||
        x.email.indexOf(this.searchString) !== -1 ||
        x.phone.indexOf(this.searchString) !== -1);
      this.listSearch = JSON.parse(JSON.stringify(data));
    }
    else {
      this.listSearch = JSON.parse(JSON.stringify(this.listStaff));
    }
    this.searchString = '';
  }

  xoa(id: any) {
    this.modalService.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      nzContent: '<b>Some descriptions</b>',
      nzOkText: 'Ok',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        let index = this.listSearch.findIndex(x => x.id === id);
        if (index !== -1) {
          this.listSearch.splice(index, 1);
        }
      }
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  valid(staff: Staff) {
    var erro = [];
    if (staff.id == "")
      erro.push({ id: "Mã nhân viên không được để trống!" });
    if (staff.name == "") {
      erro.push({ name: "Tên nhân viên không được để trống!" });
    }
    if (staff.email == "") {
      erro.push({ email: "Email không được để trống!" });
    }
    else {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(staff.email).toLowerCase())) {
        erro.push({ email: "Địa chỉ email sai cú pháp" })
      }
    }
    if (staff.phone == "") {

      erro.push({ phone: "Số điện thoại không được để trống!" });
    }
    else {
      let re = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
      if (!re.test(String(staff.phone).toLowerCase())) {
        erro.push({ phone: "Số điện thoại sai cú pháp" })
      }
    }
    return erro;
  }

  handleOk(frm: any): void {
    this.newStaff = frm.value;
    let erro = this.valid(this.newStaff);
    if (erro.length === 0) {
      console.log('ok')
    }
    else {
      console.log('fail')
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
//https://stackblitz.com/edit/angular-search-filter