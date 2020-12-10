import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { ProductInfoComponent } from './product-info/product-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [GalleryComponent, CartComponent, ProductInfoComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class ProductModule { }
