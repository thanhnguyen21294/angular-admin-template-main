import { Component, OnInit } from '@angular/core';
import { Product } from '../../@core/models/product';
import { ProductService } from '../../@core/services/product.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { NbCheckboxComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: Product[];
  totalItem: any
  pageIndex = 1;
  pageSize = 10;
  pageDisplay = 5;

  constructor(private productService: ProductService, private toast: NbToastrService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.productService.getProducts({ currentPage: this.pageIndex, itemsPerPage: this.pageSize }).subscribe((res: HttpResponse<Product[]>) => {
      if (res.status == HttpStatusCode.Ok) {
        this.products = res.body;
        this.totalItem = res.headers.get('X-Total-Count');
      }
    });
  }

  settings = {
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
      confirmText: 'Create',
      cancelText: 'Cancel',
      confirmCreate: 'Are you sure you want to create?',
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
      check: {
        title: '',
        type: 'custom',
        renderComponent: NbCheckboxComponent,
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'number',
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      status: {
        title: 'Mark for sale',
        type: 'boolean',
        hide: true
      }
    },
  };

  onDeleteConfirm(event): void {
    const productId = event.data.id;

    if (window.confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).pipe(
        catchError((err) => {
          return throwError(err)
        })
      ).subscribe(response => {
        if (response) {
          this.toast.success("Product deleted successfully.", "Delete Product");
          event.confirm.resolve();
        } else {
          this.toast.danger("Product deletion failed. Please try again later.", "Delete Product");
        }
      });
    } else {
      this.toast.warning("Deleting the product has been canceled.", "Delete Product");
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    const data = event.newData;

    if (window.confirm('Are you sure you want to create product?')) {
      this.productService.createProduct(data).pipe(
        catchError((err) => {
          return throwError(err)
        })
      ).subscribe(response => {
        if (response) {
          this.toast.success("Product created successfully.", "Create Product");
          event.confirm.resolve();
        } else {
          this.toast.danger("Product creation failed. Please try again later.", "Create Product");
        }
      });
    } else {
      this.toast.warning("Creating the product has been canceled.", "Create Product");
      event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    const data = event.newData;

    if (window.confirm('Are you sure you want to update this product?')) {
      this.productService.updateProduct(data.id, data).pipe(
        catchError((err) => {
          return throwError(err)
        })
      ).subscribe(response => {
        if (response) {
          this.toast.success("Product updated successfully.", "Update Product");
          event.confirm.resolve();
        } else {
          this.toast.danger("Product update failed. Please try again later.", "Update Product");
        }
      });
    } else {
      this.toast.warning("Updating the product has been canceled.", "Update Product");
      event.confirm.reject();
    }
  }

  changePage(event) {
    this.pageIndex = event;
    this.loadData();
  }

}
