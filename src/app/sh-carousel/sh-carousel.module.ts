import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShCarouselComponent } from './sh-carousel.component';
import { ShCarouselSlideComponent } from './sh-carousel-slide/sh-carousel-slide.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ShCarouselComponent,
    ShCarouselSlideComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ShCarouselComponent,
    ShCarouselSlideComponent
  ]
})
export class ShCarouselModule { }
