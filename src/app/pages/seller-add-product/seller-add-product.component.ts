import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/core/interfaces/data-type.ts';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {
  addProductForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService
  ) {
    this.addProductForm = this._formBuilder.group({
      product_name: [""],
      product_price: [""],
      product_color: [""],
      product_category: [""],
      product_description: [""],
      product_image_url: [""],
    })
  }

  addProduct() {
    const productData: Product = {
      productName: this.addProductForm.get("product_name")?.value,
      productPrice: this.addProductForm.get("product_price")?.value,
      productColor: this.addProductForm.get("product_color")?.value,
      productCategory: this.addProductForm.get("product_category")?.value,
      productDescription: this.addProductForm.get("product_description")?.value,
      productImageUrl: this.addProductForm.get("product_image_url")?.value,
    }
    this._productService.addProduct(productData).subscribe((res) => {
      if (res) {
        alert("Product Add Successfully!!");
      }
    });
  }
}
