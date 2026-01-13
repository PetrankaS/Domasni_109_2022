import { Component, Input } from '@angular/core';
import { shofer } from '../shofer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vozac',
  imports: [CommonModule],
  templateUrl: './vozac.html',
  styleUrl: './vozac.css',
})
export class Vozac {
  @Input()
  motordzija:shofer | undefined;

  @Input()
  indeks:Number=0;

  funk() {
    let link: string | undefined;
    if (this.motordzija?.iconUrl) {
      link=this.motordzija?.iconUrl;
    } else {
      link="https://www.google.com";
    }
    window.open(link, "_blank");
  }

  stilovi() {
    return 'underline';
  }

  klasi() {
    return {
      'begin':this.motordzija?.category=="ASD",
      'adv':this.motordzija?.category=="EXPERT",
      'box':true
    }
  }
}
