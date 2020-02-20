import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule
} from '@angular/material';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class MaterialModule { }
