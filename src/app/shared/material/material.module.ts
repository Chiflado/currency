import { NgModule } from '@angular/core';
import { MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
