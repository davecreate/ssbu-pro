import { Component, OnInit, Input } from '@angular/core';
import { isFinite } from 'lodash';
import * as chroma from 'chroma-js';

@Component({
  selector: 'ssp-hint-percent-with-stage',
  templateUrl: './hint-percent-with-stage.component.html',
  styleUrls: ['./hint-percent-with-stage.component.scss']
})
export class HintPercentWithStageComponent implements OnInit {
  selectedStage: any;
  localStages: any[];
  minimumKillPercentagesHidden = true;
  @Input() escape: any;
  @Input()
  set stages( val: any[]) {
    if (!this.selectedStage) {
      this.selectedStage = val[0];
    }
    this.localStages = val;
  }
  get stages() {
    return this.localStages;
  }
  @Input() min: number;
  @Input() max: number;
  rangeBgColor: string;
  rangeDiff: number;
  rangeDiffBgColor: string;
  rangeDiffColor: string;
  rageColorsScale = chroma.scale([
    '#FEFEFE',
    '#F89900',
    '#EF0D00',
    '#C2002B',
    '#A2022D',
    '#850020'
  ]).domain([
    0,
    50,
    100,
    150,
    200,
    300,
  ]);

  constructor() { }

  ngOnInit() {
    const colors = chroma.scale(['red', 'green']).domain([0, 32]);
    this.rangeDiff = this.max - this.min + 1;
    this.rangeBgColor = colors(this.rangeDiff).alpha(0.09).hex();
    this.rangeDiffBgColor = colors(this.rangeDiff).hex();
    // console.log(chroma.contrast(this.rangeDiffBgColor, '#fefefe'));
    this.rangeDiffColor = chroma.contrast(this.rangeDiffBgColor, '#fefefe') < 3.5 ? '#0A0A0C' : '#fefefe';
  }

  get hasValidData() {
    if (isFinite(this.max) && isFinite(this.min)) {
      return true;
    }
    return false;
  }

  selectedStageChanged() {
  }

  rageColor(value: any) {
    if (typeof value === 'number') {
      return this.rageColorsScale(value).hex();
    }
  }

  rageColorContrast(value: any) {
    if (typeof value === 'number') {
      const bgColor = this.rageColor(value);
      const textColor = chroma.contrast(bgColor, '#fefefe') < 3.5 ? '#0A0A0C' : '#fefefe';
      return textColor;
    }
  }

  isRageCell(value: any) {
    if (typeof value === 'string' && value.indexOf('%') > -1) {
      return true;
    }

    return false;
  }

  rageCellColor(value: any) {
    if (this.isRageCell(value)) {
      const num = parseInt(value, 10);
      return this.rageColor(num);
    }
  }

  rageCellColorContrast(value: any) {
    if (this.isRageCell(value)) {
      const num = parseInt(value, 10);
      return this.rageColorContrast(num);
    }
  }

  togglePercentTable() {
    this.minimumKillPercentagesHidden = !this.minimumKillPercentagesHidden;
  }

}
