import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sh-carousel',
  templateUrl: './sh-carousel.component.html',
  styleUrls: ['./sh-carousel.component.scss']
})
export class ShCarouselComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() slideHeight = '100%';
  @Input() autoPlayEnabled = true;
  @Input() showSlideNavigations = false;
  @Input() showSlidePagination = false;
  @Input() carouselPaginatorView = 'dots';
  @Input() autoPlayInterval = 5000;

  @Output() slideClick = new EventEmitter();

  @ViewChild('carousel') carousel;

  public carouselSlides: any[] = [];
  private carouselTimer: any;
  public previousSlideIndex;
  public activeSlideIndex;
  public nextSlideIndex;

  public isLoadingSlides = true;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.carouselSlides = Array.from(this.carousel.nativeElement.children).map((children, index) => index);
    this.setupCarousel();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['autoPlayInterval']) {
      if (this.autoPlayEnabled) {
        this.stopAutoPlay();
        this.startAutoPlay();
      }
    }

    if (this.autoPlayEnabled) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }

    if (this.carouselSlides.length === 1) {
      this.showSlideNavigations = false;
    }
  }

  private setupCarousel() {
    if (this.carouselSlides.length === 1) {
      this.showSlideNavigations = false;
      this.autoPlayEnabled = false;
      this.activeSlideIndex = 0;
    } else if (this.carouselSlides.length === 2) {
      const slides = this.carousel.nativeElement.children;
      this.previousSlideIndex = -1;
      this.activeSlideIndex = 0;
      this.nextSlideIndex = 1;
    } else {
      this.previousSlideIndex = this.carouselSlides.length - 1;
      this.activeSlideIndex = 0;
      this.nextSlideIndex = this.activeSlideIndex + 1;
    }

    if (this.autoPlayEnabled) {
      this.startAutoPlay();
    }

    this.setupSlides();

    Array.from(this.carousel.nativeElement.children).forEach((child, index) => {
      this.carousel.nativeElement.children[index].classList.add('slide', 'full-height', 'full-width');
      this.carousel.nativeElement.children[index].addEventListener('click', () => {
        this.slideClick.emit(index);
      });
    });

    setTimeout(() => this.isLoadingSlides = false);
  }

  setupSlides() {
    Array.from(this.carousel.nativeElement.children).forEach((child, index) => {
      this.carousel.nativeElement.children[index].classList.remove('prev', 'active', 'next');
    });

    if (this.carousel.nativeElement.children[this.previousSlideIndex]) {
      this.carousel.nativeElement.children[this.previousSlideIndex].classList.add('prev');
    }

    if (this.carousel.nativeElement.children[this.activeSlideIndex]) {

      this.carousel.nativeElement.children[this.activeSlideIndex].classList.add('active');
    }

    if (this.carousel.nativeElement.children[this.nextSlideIndex]) {
      this.carousel.nativeElement.children[this.nextSlideIndex].classList.add('next');
    }
  }

  goToPreviousSlide() {
    if (this.activeSlideIndex === 0) {
      this.activeSlideIndex = this.carouselSlides.length - 1;
    } else {
      this.activeSlideIndex--;
    }

    this.showSlide();
  }

  goToNextSlide() {
    if (this.activeSlideIndex === this.carouselSlides.length - 1) {
      this.activeSlideIndex = 0;
    } else {
      this.activeSlideIndex++;
    }

    this.showSlide();
  }

  private showSlide() {
    const totalSlides = this.carouselSlides.length;

    if (this.activeSlideIndex === 0) {
      this.previousSlideIndex = totalSlides - 1;
      this.nextSlideIndex = this.activeSlideIndex + 1;
    } else if (this.activeSlideIndex === totalSlides - 1) {
      this.previousSlideIndex = this.activeSlideIndex - 1;
      this.nextSlideIndex = 0;
    } else {
      this.previousSlideIndex = this.activeSlideIndex - 1;
      this.nextSlideIndex = this.activeSlideIndex + 1;
    }

    if (this.autoPlayEnabled) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }

    this.setupSlides();
  }

  private startAutoPlay() {
    this.carouselTimer = setInterval(() => this.goToNextSlide(), this.autoPlayInterval);
  }

  private stopAutoPlay() {
    clearInterval(this.carouselTimer);
  }

  goToSlide(slideIndex) {
    this.activeSlideIndex = slideIndex - 1;
    this.stopAutoPlay();
    this.goToNextSlide();
  }

  jumpToSlide(slideNumber) {
    this.goToSlide(slideNumber - 1);
  }

}
