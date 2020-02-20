import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  converted: number;
  amount;

  amountControl = new FormControl('');
  currencyControl = new FormControl('');

  constructor() {}

  ngOnInit() {
    this.converted = 100000;
    this.amount = 15161516;
  }

}
