import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { ProductInfoComponent } from './product-info/product-info.component';

const routes: Routes = [
  { path: 'gallery', component: GalleryComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product-info', component: ProductInfoComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
