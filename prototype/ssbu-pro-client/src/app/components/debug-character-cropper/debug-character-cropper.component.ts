import { Component, OnInit, Input } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'ssp-debug-character-cropper',
  templateUrl: './debug-character-cropper.component.html',
  styleUrls: ['./debug-character-cropper.component.scss']
})
export class DebugCharacterCropperComponent implements OnInit {
  @Input() totalIds: number;
  @Input() characterId: string;
  @Input() cropOpacity: number;
  @Input() cropPercentLeft: number;
  @Input() cropPercentTop: number;
  @Input() cropPercentScale: number;
  @Input() referenceTransform: string;
  @Input() referenceOpacity: string;
  savedOffsets = {};

  constructor() { }

  ngOnInit() {
    const savedOffsets = localStorage.getItem('cropOffsets');
    if (savedOffsets) {
      this.savedOffsets = JSON.parse(savedOffsets);
      console.log(this.totalPercentDone(), savedOffsets);
    }
  }

  saveProps() {
    this.savedOffsets = {
      ...this.savedOffsets,
      [this.characterId]: {
        left: this.cropPercentLeft,
        top: this.cropPercentTop,
        scale: this.cropPercentScale,
      }
    };
    localStorage.setItem('cropOffsets', JSON.stringify(this.savedOffsets));
    console.log(this.totalPercentDone(), this.savedOffsets);
  }

  totalPercentDone() {
    return `${(Object.keys(this.savedOffsets).length / this.totalIds) * 100}%`;
  }

}
