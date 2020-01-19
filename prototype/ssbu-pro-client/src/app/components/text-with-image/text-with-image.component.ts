import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ssp-text-with-image',
  templateUrl: './text-with-image.component.html',
  styleUrls: ['./text-with-image.component.scss']
})
export class TextWithImageComponent implements OnInit {
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
