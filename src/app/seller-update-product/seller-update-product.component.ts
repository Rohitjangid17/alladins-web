import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/data-type.ts';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {
  updateProductForm: FormGroup;
  productData!: Product;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService
  ) {
    this.updateProductForm = this._formBuilder.group({
      product_name: [""],
      product_price: [""],
      product_color: [""],
      product_category: [""],
      product_description: [""],
      product_image_url: [""],
    })
  }

  ngOnInit(): void {
    let productId = this._activatedRoute.snapshot.paramMap.get('id');

    productId && this._productService.getProduct(productId).subscribe(data => {
      this.productData = data;
      this.updateProductForm.patchValue({
        product_name: data.productName,
        product_price: data.productPrice,
        product_color: data.productColor,
        product_category: data.productCategory,
        product_description: data.productDescription,
        product_image_url: data.productImageUrl,
      })
    })
  }

  updateProduct() {
    this.productData = {
      ...this.productData,
      // id: this.productData.id,
      productName: this.updateProductForm.get('product_name')?.value,
      productPrice: this.updateProductForm.get('product_price')?.value,
      productColor: this.updateProductForm.get('product_color')?.value,
      productCategory: this.updateProductForm.get('product_category')?.value,
      productDescription: this.updateProductForm.get('product_description')?.value,
      productImageUrl: this.updateProductForm.get('product_image_url')?.value,
    };
    console.log(this.productData)
    this._productService.updateProductWithId(this.productData).subscribe((res) => {
      console.log(res);
    })
  }
}
