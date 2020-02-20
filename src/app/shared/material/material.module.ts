import { NgModule } from '@angular/core';
import { MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class MaterialModule { }
