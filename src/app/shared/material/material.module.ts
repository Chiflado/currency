import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [
    MatCardModule,
  ]
})
export class MaterialModule { }
