import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { TopNavbarComponent } from './layout/top-navbar/top-navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CurrencyConverterComponent } from './layout/currency-converter/currency-converter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumberDirective } from './shared/only-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TopNavbarComponent,
    SidebarComponent,
    CurrencyConverterComponent,
    OnlyNumberDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
