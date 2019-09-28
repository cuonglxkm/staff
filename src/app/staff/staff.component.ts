import { Component, OnInit } from "@angular/core";
import { Staff } from "./staff";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: "app-staff",
  templateUrl: "./staff.component.html",
  styleUrls: ["./staff.component.scss"]
})
export class StaffComponent implements OnInit {
  constructor(private modalService: NzModalService) {}
  listStaff: Staff[] = [
    new Staff(
      "nv01",
      "Phạm Văn Cương",
      "cuonglxkm@gmail.com",
      "0961080526",
      "Hoàng Mai, Hà Nội"
    ),
    new Staff(
      "nv02",
      "Hải tc",
      "haitc@gmail.com",
      "0303030303",
      "Minh Khai, Hà Nội"
    ),
    new Staff(
      "nv03",
      "Sơn",
      "son@gmail.com",
      "13123123312",
      "Hoàng Mai, Hà Nội"
    ),
    new Staff("nv04", "Thái", "tuan@gmail.com", "123123", "Hoàng Mai, Hà Nội"),
    new Staff("nv05", "Tuấn", "tuan@gmail.com", "12213123", "Hoàng Mai, Hà Nội")
  ];
  isSearch = false;
  searchString = "";
  listSearch = [];
  isVisible = false;
  newStaff: Staff = new Staff("", "", "", "", "");
  errors = [];
  style = new Staff("", "", "", "", "");

  ngOnInit() {
    this.listSearch = JSON.parse(JSON.stringify(this.listStaff));
  }

  onClick() {
    if (this.searchString !== "") {
      const data = this.listStaff.filter(
        x =>
          x.id.indexOf(this.searchString) !== -1 ||
          x.name.indexOf(this.searchString) !== -1 ||
          x.email.indexOf(this.searchString) !== -1 ||
          x.phone.indexOf(this.searchString) !== -1
      );
      this.listSearch = JSON.parse(JSON.stringify(data));
    } else {
      this.listSearch = JSON.parse(JSON.stringify(this.listStaff));
    }
    this.searchString = "";
  }

  xoa(id: any) {
    this.modalService.confirm({
      nzTitle: "<i>Do you Want to delete these items?</i>",
      nzContent: "<b>Some descriptions</b>",
      nzOkText: "Ok",
      nzCancelText: "Cancel",
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
    this.errors = [];
  }

  handleOk(): void {
    if (
      this.style.id === "is-valid" &&
      this.style.name === "is-valid" &&
      this.style.email === "is-valid" &&
      this.style.phone === "is-valid" &&
      this.style.address === "is-valid"
    ) {
      this.listSearch.push({...this.newStaff});
      console.log(this.listStaff);
    } else {
      console.log("errrororooror");
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }
  onValid(value): void {
    // event.target.style={'is-invalid':false,'is-valid':false};
    // tslint:disable-next-line: no-debugger
    switch (value.name) {
      case "id":
        // tslint:disable-next-line: triple-equals
        if (value.value == "") {
          this.style.id = "is-invalid";
        } else {
          this.style.id = "is-valid";
        }
        break;
      case "name":
        // tslint:disable-next-line: triple-equals
        if (value.value == "") {
          this.style.name = "is-invalid";
        } else {
          this.style.name = "is-valid";
        }
        break;
      case "email":
        // tslint:disable-next-line: max-line-length
        const mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (
          // tslint:disable-next-line: triple-equals
          value.value == "" ||
          !mail.test(String(value.value).toLowerCase())
        ) {
          this.style.email = "is-invalid";
        } else {
          this.style.email = "is-valid";
        }
        break;
      case "phone":
        const phone = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
        if (
          // tslint:disable-next-line: triple-equals
          value.value == "" ||
          !phone.test(String(value.value).toLowerCase())
        ) {
          this.style.phone = "is-invalid";
        } else {
          this.style.phone = "is-valid";
        }
        break;
      case "address":
        // tslint:disable-next-line: triple-equals
        if (value.value == "") {
          this.style.address = "is-invalid";
        } else {
          this.style.address = "is-valid";
        }
        break;
    }
  }
}
//https://stackblitz.com/edit/angular-search-filter
