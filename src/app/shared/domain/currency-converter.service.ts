import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetCurrenciesResponse } from '../data';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  private BASE_URL = 'https://api.exchangeratesapi.io/latest';

  constructor(private http: HttpClient) { }

  getExchangeRates(currency): Observable<GetCurrenciesResponse> {
    return this.http.get<GetCurrenciesResponse>(this.BASE_URL + `?base=${currency}`).pipe(map(resp => {
      return resp;
    }));
  }
}
