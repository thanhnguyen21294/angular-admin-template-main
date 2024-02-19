import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TYPE } from '../../../@core/constants/type.constant';
import { SelectService } from '../../../@core/services/select.service';
import { UserService } from '../../../@core/services';
import { User } from '../../../@core/models/User';
import { formatDate, mapObjectData } from '../../../@core/utils/format';

@Component({
  selector: 'ngx-addoredit',
  templateUrl: './AddOrEdit.component.html',
  styleUrls: ['./AddOrEdit.component.scss'],
})
export class AddOrEditModalComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({});
  @Input() title: string;
  @Input() data: any;

  userName = '';
  passWord = '';
  public userData: Partial<User> = {
    avatar: "",
    birthday: "",
    email: "",
    firstName: "",
    gender: "",
    lastName: "",
    password: "",
    phone: "",
    status: false,
    username: ""
  };

  genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  DEFAULT_AVATAR = 'https://robohash.org/accusantiumminimamagni.png?size=50x50&set=set1';

  constructor(protected ref: NbDialogRef<AddOrEditModalComponent>, private noti: NbToastrService, private userService: UserService,
    private _selectService: SelectService, private formBuilder: FormBuilder) { }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      avatar: [this.DEFAULT_AVATAR],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(9)]],
      birthday: ['', Validators.required],
      status: [false]
    }, {
      validators: this.validatePassword
    });
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    if (this.data) {
      let newData = this.data.data;

      if (this.title === TYPE.UPDATE) {
        this.userService.updateUser(newData.id, newData).pipe(
          catchError(error => {
            return throwError(error)
          })
        ).subscribe(response => {
          if (response) {
            this.noti.success("User updated successfully.", "Update User");
            this._selectService.notifyModified(newData.id);
          } else {
            this.noti.danger("User update failed. Please try again later.", "Update User");
          }
        });
      } else if (this.title === TYPE.DELETE) {
        this.userService.deleteUser(newData.id).pipe(
          catchError(error => {
            return throwError(error)
          })
        ).subscribe(response => {
          if (response) {
            this.noti.success("User deleted successfully.", "Delete User");
            this._selectService.notifyModified(newData.id);
          } else {
            this.noti.danger("User deletion failed. Please try again later.", "Delete User");
          }
        });
      }
    }
    this.ref.close();
  }

  getTitle(title: string): string {
    let titleText = "";
    if (title === TYPE.CREATE) {
      titleText = "Create User"
    } else if (title === TYPE.UPDATE) {
      titleText = "Update User"
    } else if (title === TYPE.DELETE) {
      titleText = "Delete User"
    }

    return titleText;
  }

  get formControls() {
    return this.registerForm.controls;
  }

  submitCreateUser() {
    if (this.registerForm.status === "VALID") {
      this.registerForm.value.birthday = formatDate(this.registerForm.value.birthday);
      const data = mapObjectData<User>(this.registerForm.value, this.userData);

      this.userService.createUser(data).pipe(
        catchError(err => {
          return throwError(err)
        })
      ).subscribe(response => {
        if (response) {
          this.noti.success("User created successfully.", "Create user");
          this._selectService.notifyModified(response.id);
          this.createRegisterForm();
          this.ref.close();
        } else {
          this.noti.danger("User creation failed. Please try again later.", "Create user");
        }
      })
    } else {
      this.noti.warning("Form is not valid", "Create user");
      this.validateAllFormFields(this.registerForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  validatePassword(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }
}
