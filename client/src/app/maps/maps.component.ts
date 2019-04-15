import {Component, Input, OnInit} from '@angular/core';
import {Marker} from "./marker";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @Input() mapHeightVH: string;
  @Input() lat: number = 45.593614;
  @Input() lng: number = -95.890831;
  @Input() markers: Marker[] = [];

  constructor() {}

  ngOnInit() {
    document.getElementById("map").style.height = this.mapHeightVH + "vh";
  }
}
