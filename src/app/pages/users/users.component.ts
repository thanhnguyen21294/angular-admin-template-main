import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../@core/models/User';
import { NbDialogService } from '@nebular/theme';
import { AddOrEditModalComponent } from './AddOrEditUserModal/AddOrEdit.component';
import { TYPE } from '../../@core/constants/type.constant';
import { Subscription } from 'rxjs';
import { SelectService } from '../../@core/services/select.service';
import { UserService } from '../../@core/services';

@Component({
  selector: 'ngx-manage-user',
  templateUrl: './users.component.html',
})
export class ManageUserComponent implements OnInit, OnDestroy {
  users: User[];
  names: string[] = [];
  subscription: Subscription;

  constructor(private userService: UserService, private dialogService: NbDialogService, private _selectService: SelectService) { }

  ngOnInit(): void {
    this.loadData();
    this.subscription = this._selectService.ModifiedUserObservable$.subscribe((res) => {
      if (res) {
        this.loadData();
      }
    })
  }

  loadData() {
    this.userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
    });
  }

  settings = {
    mode: 'external',
    actions: {
      position: 'right'
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    createConfirm: {
      confirmText: 'Confirm create user',
      cancelText: 'Cancel',
      confirmCreate: 'Are you sure you want to create new user?',
      cancelCreate: 'Create cancelled',
    },
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        hide: true
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      gender: {
        title: 'Gender',
        type: 'string',
        editable: false
      },

    },
  };

  onDeleteConfirm(event): void {
    this.openModal(TYPE.DELETE, event);
  }

  onCreateConfirm(event) {
    this.openModal(TYPE.CREATE, event);
  }

  onEditConfirm(event) {
    this.openModal(TYPE.UPDATE, event);
  }

  openModal(type: string, data: any) {
    this.dialogService.open(AddOrEditModalComponent, {
      context: {
        title: type,
        data: data
      }
    })
      .onClose.subscribe(name => name && this.names.push(name));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
