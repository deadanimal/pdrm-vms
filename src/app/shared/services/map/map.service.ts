import { Injectable } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';
import { Map } from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map = new AsyncSubject<Map>();
  constructor(
    private http: HttpClient
  ) { }

  getData(file = 1): Observable<any> {
    return this.http.get<any>('../../../../assets/data/pelabuhan.json');
  }

}
