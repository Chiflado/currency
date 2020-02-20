import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CurrencyConverterService } from 'src/app/shared/domain/currency-converter.service';
import { ECANCELED } from 'constants';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  converted: number;
  amount;
  currency: string;

  amountControl = new FormControl('');
  currencyControl = new FormControl('');

  constructor(private service: CurrencyConverterService) {
  }

  ngOnInit() {
  }

  getCurrencies() {
    this.converted = null;
    this.amount = this.amountControl.value;
    this.currency = this.currencyControl.value;
    this.service.getExchangeRates(this.currency).subscribe(resp => this.convertAmount(resp.rates.USD));
  }

  convertAmount(exchRate) {
    if (this.amount.includes(',')) {
      const colonInd = this.amount.indexOf(',');
      this.amount = this.setCharAt(this.amount, colonInd, '.');
    }
    this.converted = Number(this.amount) * exchRate;
  }

  setCharAt(str, index, chr) {
    return str.substr(0, index) + chr + str.substr(index + 1);
  }

}
