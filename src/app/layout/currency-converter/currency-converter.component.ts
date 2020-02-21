import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrencyConverterService } from 'src/app/shared/domain/currency-converter.service';
import { SumTableData } from 'src/app/shared/data';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html'
})
export class CurrencyConverterComponent implements OnDestroy {

  converted: number;
  amount: string;
  currency: string;
  exchangedHistory: SumTableData[] = [];
  exchDate: string;

  amountControl = new FormControl('');
  currencyControl = new FormControl('');
  showTable = false;
  isButtonDisabled = true;

  subscriptions: Subscription = new Subscription();

  constructor(private service: CurrencyConverterService, private dialog: MatDialog) {
    const amountCtrlSub = this.amountControl.valueChanges.subscribe(() => this.isButtonDisabled = true);
    const amountDebounce = this.amountControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    );
    const currencyCtrlSub = this.currencyControl.valueChanges.subscribe(() => {
      this.isButtonDisabled = true;
      this.getCurrencies();
    });
    const debounceSub = amountDebounce.subscribe(() => {
      this.getCurrencies();
    });
    this.subscriptions.add(amountCtrlSub).add(currencyCtrlSub).add(debounceSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getCurrencies(): void {
    this.amount = this.amountControl.value;
    this.currency = this.currencyControl.value;
    if (this.amount && this.currency) {
      const serviceSub = this.service.getExchangeRates(this.currency).subscribe(resp => {
        this.exchDate = resp.date;
        this.convertAmount(resp.rates.USD);
      });
      this.subscriptions.add(serviceSub);
    }
  }

  convertAmount(exchRate: number): void {
    if (this.amount.includes(',')) {
      const colonInd = this.amount.indexOf(',');
      this.amount = this.setCharAt(this.amount, colonInd, '.');
    }
    this.converted = Number(this.amount) * exchRate;
    this.isButtonDisabled = false;
  }

  addExchangedToTable(): void {
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
        const closeSub = dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.addElement(element);
          }
        });
        this.subscriptions.add(closeSub);
      } else {
        this.addElement(element);
      }
  }

  addElement(element: SumTableData): void {
    this.showTable = false;
    this.exchangedHistory.push(element);
    setTimeout(() => {
      this.showTable = true;
    }, 100);
  }

  setCharAt(str: string, index: number, chr: string): string {
    return str.substr(0, index) + chr + str.substr(index + 1);
  }

  isFieldsChanged(): boolean {
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
