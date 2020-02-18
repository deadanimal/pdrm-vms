import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Map, NavigationControl } from 'mapbox-gl';
import { MapService } from 'src/app/shared/services/map/map.service';
import { Observable, combineLatest, of } from 'rxjs';
import { ScatterplotLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-bda',
  templateUrl: './bda.component.html',
  styleUrls: ['./bda.component.scss']
})
export class BdaComponent implements OnInit {

  @ViewChild('mapEl', {static: true})
  mapEl: ElementRef<HTMLDivElement>;

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

    this.mapSrv.getData(1)
    .pipe(
      switchMap(d => combineLatest(of(d), this.mapSrv.map)),
      map(([d, glMap]) => {
        return this.setLayers(glMap, d);
      })
    )
    .subscribe();
  }

  setLayers(m: Map, data: any): Observable<Map> {
    const scatter = new MapboxLayer({
      id: "scatter",
      type: ScatterplotLayer,
      data,
      source: "scatter",
      opacity: 0.8,
      filled: true,
      radiusMinPixels: 15,
      radiusMaxPixels: 18,
      getPosition: d => [d.Longitude, d.Latitude],
      getFillColor: d =>
      d.n_killed > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],
      pickable: true,
      onHover: ({ object, x, y }) => {
        if (!!object) {
            console.log(object, x, y);
        }
      }
    });

    m.addLayer(scatter);
    return of(m);
  }

  ngOnDestory() {
    this.mapSrv.map.subscribe(glMap => {
      glMap.removeLayer("scatter");
    });
  }

}
