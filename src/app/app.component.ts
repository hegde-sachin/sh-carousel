import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

declare const tinycolor: any;

export interface Color {
  name: string;
  hex: string;
  darkContrast: boolean;
}

@Component({
  selector: 'sh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('shCarousel', {static: false}) shCarousel;

  public colorPalettes = [
    {
      name: 'My Color : Teal and Gold',
      primary: '#118899',
      accent: '#FFD700'
    },
    {
      name: 'Deep Purple and Amber',
      primary: '#673ab7',
      accent: '#ffd740'
    },
    {
      name: 'Indigo & Pink',
      primary: '#3f51b5',
      accent: '#ff4081'
    },
    {
      name: 'Pink & Blue-grey',
      primary: '#e91e63',
      accent: '#ff4081'
    },
    {
      name: 'Purple & Green',
      primary: '#9c27b0',
      accent: '#69f0ae'
    }
  ];

  private isLightTheme = true;

  public componentPropertyList = [
    {
      propertyName: 'autoPlayEnabled',
      defaultValue: 'true',
      description: 'Enable carousel auto slide'
    },
    {
      propertyName: 'showSlideNavigations',
      defaultValue: 'false',
      description: 'Show navigation buttons to slide'
    },
    {
      propertyName: 'showSlidePagination',
      defaultValue: 'false',
      description: 'Show slide paginator'
    },
    {
      propertyName: 'carouselPaginatorView',
      defaultValue: '"dots"',
      description: 'Carousel paginator views. Supports "dots" and "fraction" values'
    },
    {
      propertyName: 'autoPlayInterval',
      defaultValue: '5000',
      description: 'Autoplay animation interval. Value should be integer and in milliseconds'
    },
  ];

public componentMethodList = [
  {
    methodName: 'goToPreviousSlide',
    methodParameters: '',
    description: 'Used to go to the previous slide'
  },
  {
    methodName: 'goToNextSlide',
    methodParameters: '',
    description: 'Used to go to the next slide'
  },
  {
    methodName: 'jumpToSlide',
    methodParameters: 'slideNumber: number',
    description: 'Used to go to a particular slide. This function expects a number as parameter'
  }
];

private componentEventList = [
  {
    methodName: 'slideClick',
    description: 'Emitted on click of a slide'
  }
];

  carouselSlides = [
    {
      src: 'https://sorgalla.com/jcarousel/examples/_shared/img/img1.jpg'
    },
    {
      src: 'https://sorgalla.com/jcarousel/examples/_shared/img/img2.jpg'
    },
    {
      src: 'https://sorgalla.com/jcarousel/examples/_shared/img/img3.jpg'
    },
    {
      src: 'https://sorgalla.com/jcarousel/examples/_shared/img/img4.jpg'
    },
    {
      src: 'https://sorgalla.com/jcarousel/examples/_shared/img/img5.jpg'
    },
    {
      src: 'https://sorgalla.com/jcarousel/examples/_shared/img/img6.jpg'
    }
  ];

  componentPropertiesdisplayedColumns: string[] = ['className', 'defaultValue', 'description'];
  componentPropertiesDataSource = new MatTableDataSource();

  componentMethodsdisplayedColumns: string[] = ['className', 'methodParameters', 'description'];
  componentMethodsDataSource = new MatTableDataSource();

  componentEventsdisplayedColumns: string[] = ['className', 'description'];
  componentEventsDataSource = new MatTableDataSource();

  usage = `
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
</sh-carousel>`;

public autoPlayEnabled = false;
public showSlideNavigations = false;
public showSlidePagination = false;
public bindMouseScroll = false;
public carouselPaginatorView = new FormControl('dots');
public carouselAutoplayInterval = new FormControl('5000');

  constructor(private overlayContainer: OverlayContainer) {

  }

  ngOnInit() {
    this.setColor(this.colorPalettes[0].primary, this.colorPalettes[0].accent);
    this.assignThemeClasses();
    this.componentPropertiesDataSource.data = this.componentPropertyList;
    this.componentMethodsDataSource.data = this.componentMethodList;
    this.componentEventsDataSource.data = this.componentEventList;
  }

  setColor(primary, accent) {
    this.savePrimaryColor(primary);
    this.saveSecondaryColor(accent);
  }

  savePrimaryColor(primaryColor) {
    const primaryColorPalette = this.computeColors(primaryColor);

    for (const color of primaryColorPalette) {
      const key1 = `--theme-primary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-primary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  saveSecondaryColor(secondaryColor) {
    const secondaryColorPalette = this.computeColors(secondaryColor);

    for (const color of secondaryColorPalette) {
      const key1 = `--theme-secondary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-secondary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  toggleDarkTheme() {
    this.isLightTheme = !this.isLightTheme;

    this.assignThemeClasses();
  }

  assignThemeClasses() {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;

    if (this.isLightTheme) {
      document.body.classList.remove('sh-dark-theme');
      overlayContainerClasses.remove('sh-dark-theme');
      document.body.classList.add('sh-light-theme');
      overlayContainerClasses.add('sh-light-theme');
    } else {
      document.body.classList.remove('sh-light-theme');
      overlayContainerClasses.remove('sh-light-theme');
      document.body.classList.add('sh-dark-theme');
      overlayContainerClasses.add('sh-dark-theme');
    }
  }

  computeColors(hex: string): Color[] {
    return [
      this.getColorObject(tinycolor(hex).lighten(52), '50'),
      this.getColorObject(tinycolor(hex).lighten(37), '100'),
      this.getColorObject(tinycolor(hex).lighten(26), '200'),
      this.getColorObject(tinycolor(hex).lighten(12), '300'),
      this.getColorObject(tinycolor(hex).lighten(6), '400'),
      this.getColorObject(tinycolor(hex), '500'),
      this.getColorObject(tinycolor(hex).darken(6), '600'),
      this.getColorObject(tinycolor(hex).darken(12), '700'),
      this.getColorObject(tinycolor(hex).darken(18), '800'),
      this.getColorObject(tinycolor(hex).darken(24), '900'),
      this.getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
      this.getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
      this.getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
      this.getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700')
    ];
  }

  getColorObject(value, name): Color {
    const c = tinycolor(value);
    return {
      name,
      hex: c.toHexString(),
      darkContrast: c.isLight()
    };
  }

  toggleAutoplay() {
    this.autoPlayEnabled = !this.autoPlayEnabled;
  }

  toggleSlideNavigationButtons() {
    this.showSlideNavigations = !this.showSlideNavigations;
  }

  toggleSlidePaginationButtons() {
    this.showSlidePagination = !this.showSlidePagination;
  }

  toggleBindMouseScroll() {
    this.bindMouseScroll = !this.bindMouseScroll;
  }

  goToPreviousSlide() {
    this.shCarousel.goToPreviousSlide();
  }

  goToNextSlide() {
    this.shCarousel.goToNextSlide();
  }

  goToSlide() {
    this.shCarousel.jumpToSlide(3);
  }

  onSlideClick(slideIndex) {
    alert('Slide selected : ' + (+slideIndex + 1));
  }
}
