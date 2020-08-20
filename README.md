## Angular Carousel and Time Picker

An Angular Carousel component and supports Angular 9+.

### Dependencies
Install the dependenccies mentioned below
```markdown
npm install @angular/material
npm install @angular/flex-layout
npm install tinycolor2
```

### How to use
Import `ShCarouselModule` into the module where you want to use `sh-carousel`
```markdown
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ShCarouselModule } './sh-carousel/sh-carousel.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ShCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
#### Basic Carousel
```markdown
<sh-carousel>
  <sh-carousel-slide>
    <img src="https://sorgalla.com/jcarousel/examples/_shared/img/img1.jpg" [alt]="'Image 1'">
  </sh-carousel-slide>
  <sh-carousel-slide>
    <img src="https://sorgalla.com/jcarousel/examples/_shared/img/img2.jpg" [alt]="'Image 2'">
  </sh-carousel-slide>
  <sh-carousel-slide>
    <img src="https://sorgalla.com/jcarousel/examples/_shared/img/img3.jpg" [alt]="'Image 3'">
  </sh-carousel-slide>
</sh-carousel>
```
#### Advanced Time picker
```markdown
<sh-carousel>
  <sh-carousel-slide>
    <img src="https://sorgalla.com/jcarousel/examples/_shared/img/img1.jpg" [alt]="'Image 1'">
  </sh-carousel-slide>
  <sh-carousel-slide>
    <iframe width="951" height="535" src="https://www.youtube.com/embed/2MpUj-Aua48" frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </sh-carousel-slide>
  <sh-carousel-slide>
    <span style="color: red">Note: Planned Maintenance in next 2 days</span>
  </sh-carousel-slide>
</sh-carousel>
```

#### Demo
[https://sh-carousel.web.app/](https://sh-carousel.web.app/)

#### Screenshots
![Image 1](https://firebasestorage.googleapis.com/v0/b/sh-carousel.appspot.com/o/img1.png?alt=media&token=b162e557-518d-4c2a-8242-1516f658aadd)
![Image 2](https://firebasestorage.googleapis.com/v0/b/sh-carousel.appspot.com/o/img2.png?alt=media&token=678950d5-e29c-4013-8e0a-44e06c7a4d86)
![Image 3](https://firebasestorage.googleapis.com/v0/b/sh-carousel.appspot.com/o/img3.png?alt=media&token=13e9c5b5-b463-4e6d-9c2c-8af7ee6c5c37)
