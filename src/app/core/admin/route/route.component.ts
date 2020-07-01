import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Map, NavigationControl } from 'mapbox-gl';
import { MapService } from 'src/app/shared/services/map/map.service';
import { Observable, combineLatest, of } from 'rxjs';
import { ScatterplotLayer, PolygonLayer } from '@deck.gl/layers';
import { TripsLayer } from '@deck.gl/geo-layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { switchMap, map } from 'rxjs/operators';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [-74.05, 40.7, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight});

const material = {
  ambient: 0.1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70]
};

const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material,
  effects: [lightingEffect]
};

const INITIAL_VIEW_STATE = {
  longitude: 100.387573,
  latitude: 5.186688,
  zoom: 13,
  pitch: 45,
  bearing: 0
};

const loopLength = 1800 // unit corresponds to the timestamp in source data
const animationSpeed = 30 // unit time per second
const timestamp = Date.now() / 1000;
const loopTime = loopLength / animationSpeed;

const trailLength = 180
const theme = DEFAULT_THEME


const landCover = [[[-74.0, 40.7], [-74.02, 40.7], [-74.02, 40.72], [-74.0, 40.72]]];

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  @ViewChild('mapEl', {static: true})
  mapEl: ElementRef<HTMLDivElement>;

  time = ((timestamp % loopTime) / loopTime) * loopLength

  private map: Map;
  constructor(
    public mapSrv: MapService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapEl.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v9',
       center: {lng: 101.9758, lat: 4.2105},
       zoom: 6,
       pitch: 20,
      attributionControl: false
    });
    this.map.addControl(
      new NavigationControl({
        showZoom: true,
        showCompass: true
      }),
      'top-right'
    );
    this.mapSrv.map.next(this.map);
  
    this.map.on('load', () => {
      console.log('map loaded');
      this.mapSrv.map.complete();
    });

    this.mapSrv.getData1(1)
    .pipe(
      switchMap(d => combineLatest(of(d), this.mapSrv.map)),
      map(([d, glMap]) => {
        return this.setLayers(glMap, d);
      })
    )
    .subscribe();
  }

  setLayers(m: Map, data: any): Observable<Map> {
    const polygon = new MapboxLayer({
      id: 'ground',
      type: PolygonLayer,
      data: landCover,
      getPolygon: f => f,
      stroked: false,
      getFillColor: [0, 0, 0, 0]
    })
    const trip = new MapboxLayer({
      id: 'trips',
      type: TripsLayer,
      data: data,
      source: "trips",
      getPath: d => d.path,
      getTimestamps: d => d.timestamps,
      getColor: d => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
      opacity: 0.3,
      widthMinPixels: 2,
      rounded: true,
      trailLength,
      currentTime: this.time,
      shadowEnabled: false
    })

    m.addLayer(polygon)
    m.addLayer(trip)
    return of(m)
  }

  ngOnDestory() {
    this.mapSrv.map.subscribe(glMap => {
      glMap.removeLayer("trips");
    });
  }

}
