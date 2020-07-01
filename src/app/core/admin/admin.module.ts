import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  BsDropdownModule, 
  ProgressbarModule, 
  TooltipModule, 
  BsDatepickerModule
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { ManagementComponent } from './management/management.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ReportComponent } from './report/report.component';
import { VesselComponent } from './vessel/vessel.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { BdaComponent } from './bda/bda.component';

import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as mapbox from 'mapbox-gl';
import { RouteComponent } from './route/route.component';
(mapbox as any).accessToken = environment.mapbox.accessToken

@NgModule({
  declarations: [
    DashboardComponent,
    ManagementComponent,
    AnalyticsComponent,
    ReportComponent,
    VesselComponent,
    MaintenanceComponent,
    BdaComponent,
    RouteComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(AdminRoutes),
    LeafletModule,
    LeafletMarkerClusterModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule
  ]
})
export class AdminModule { }
