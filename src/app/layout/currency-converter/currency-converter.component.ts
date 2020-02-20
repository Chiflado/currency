import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrencyConverterService } from 'src/app/shared/domain/currency-converter.service';
import { SumTableData } from 'src/app/shared/data';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html'
})
export class CurrencyConverterComponent {

  converted: number;
  amount: string;
  currency: string;
  exchangedHistory: SumTableData[] = [];

  amountControl = new FormControl('');
  currencyControl = new FormControl('');
  showTable = false;
  isButtonDisabled = true;

  constructor(private service: CurrencyConverterService, public dialog: MatDialog) {
    this.amountControl.valueChanges.subscribe(() => this.isButtonDisabled = true);
    const amountDebounce = this.amountControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    );
    this.currencyControl.valueChanges.subscribe(() => {
      this.isButtonDisabled = true;
      this.getCurrencies();
    });
    amountDebounce.subscribe(() => {
      this.getCurrencies();
    });
  }

  getCurrencies(): void {
    this.amount = this.amountControl.value;
    this.currency = this.currencyControl.value;
    if (this.amount && this.currency) {
      this.service.getExchangeRates(this.currency).subscribe(resp => this.convertAmount(resp.rates.USD));
    }
  }

  convertAmount(exchRate): void {
    if (this.amount.includes(',')) {
      const colonInd = this.amount.indexOf(',');
      this.amount = this.setCharAt(this.amount, colonInd, '.');
    }
    this.converted = Number(this.amount) * exchRate;
    this.isButtonDisabled = false;
  }

  addExchangedToTable() {
    const element: SumTableData = {
      amount: this.amount,
      converted: this.converted,
      currency: this.currency
    };
    if (!this.isFieldsChanged()) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: 'auto',
          height: 'auto'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.addElement(element);
          }
        });
    } else {
      this.addElement(element);
    }
  }

  addElement(element) {
    this.showTable = false;
    this.exchangedHistory.push(element);
    setTimeout(() => {
      this.showTable = true;
    }, 100);
  }

  setCharAt(str: string, index: number, chr: string): string {
    return str.substr(0, index) + chr + str.substr(index + 1);
  }

  isFieldsChanged() {
    if (this.exchangedHistory.length > 0) {
      const lastIndex = this.exchangedHistory.length - 1;
      if (this.exchangedHistory[lastIndex].amount !== this.amountControl.value) {
        return true;
      }
      if (this.exchangedHistory[lastIndex].currency !== this.currencyControl.value) {
        return true;
      }
      return false;
    }
    return true;
  }

}
