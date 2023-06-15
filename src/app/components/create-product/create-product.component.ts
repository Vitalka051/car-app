import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private modalService: ModalService
  ) {}

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  get title() {
    return this.form.controls.title as FormControl;
  }

  ngOnInit(): void {}

  submit() {
    this.productService
      .create({
        brand: this.form.value.title as string,
        price: 160000,
        info: 'Mercedes-Benz Klasa C to luksusowy samochód o wyrafinowanym designie i doskonałej jakości wykonania. Posiada zaawansowane systemy bezpieczeństwa i komfortowe wnętrze, które zapewniają niezapomniane doznania podczas jazdy',
        image:
          'https://www.topgear.com/sites/default/files/2021/11/Mercedes_C300D_0000.jpg',
        kilometers: 8000,
        model: 'Klasa C',
        year: 2022,
        power: 200,
      })
      .subscribe(() => {
        this.modalService.close();
      });
  }
}
