import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, HostListener } from '@angular/core';

@Component({
  selector: 'ssp-character-crop',
  templateUrl: './character-crop.component.html',
  styleUrls: ['./character-crop.component.scss']
})
export class CharacterCropComponent implements OnInit {
  @Input() squareRatio = false;
  @Input() characterId: string;
  @Input() characterName: string;
  @Input() percentTop = 0;
  @Input() percentLeft = 0;
  @Input() percentScale = 100;
  @ViewChild('cropMask', { read: ElementRef, static: true}) cropMask: ElementRef;
  imgShadowFilter: string;
  nameFontSize: number;
  letterSpacingSize: number;
  textStroke: string;
  outlineBorderString: string;

  constructor() { }

  ngOnInit() {
    this.setScaledSizes();
  }

  setScaledSizes() {
    // All decimals are based of the 522 original designs.
    const { offsetWidth } = this.cropMask.nativeElement;
    const filterSize = offsetWidth * 0.04981;
    const textStrokeSize = offsetWidth * 0.03448275862;
    const borderSize = offsetWidth * 0.01149425287;
    this.imgShadowFilter = `drop-shadow(${filterSize}px ${filterSize}px 0 rgba(10, 10, 12, 0.5))`;
    this.textStroke = `${textStrokeSize}px rgb(10, 10, 12)`;
    this.outlineBorderString = `solid ${borderSize}px rgb(10, 10, 12)`;
    this.nameFontSize = offsetWidth * 0.12;
    this.letterSpacingSize =  offsetWidth * 0.00383141762;
  }

  @HostListener('window:resize')
  onResized() {
    this.setScaledSizes();
  }

}
