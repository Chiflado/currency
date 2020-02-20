import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrencyConverterService } from 'src/app/shared/domain/currency-converter.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html'
})
export class CurrencyConverterComponent {

  converted: number;
  amount: string;
  currency: string;

  amountControl = new FormControl('');
  currencyControl = new FormControl('');

  constructor(private service: CurrencyConverterService) {
  }

  getCurrencies(): void {
    this.converted = null;
    this.amount = this.amountControl.value;
    this.currency = this.currencyControl.value;
    this.service.getExchangeRates(this.currency).subscribe(resp => this.convertAmount(resp.rates.USD));
  }

  convertAmount(exchRate): void {
    if (this.amount.includes(',')) {
      const colonInd = this.amount.indexOf(',');
      this.amount = this.setCharAt(this.amount, colonInd, '.');
    }
    this.converted = Number(this.amount) * exchRate;
  }

  setCharAt(str: string, index: number, chr: string): string {
    return str.substr(0, index) + chr + str.substr(index + 1);
  }

}
