import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { angularMaterialModule } from './angular-material';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...angularMaterialModule,
    FlexLayoutModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ...angularMaterialModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
