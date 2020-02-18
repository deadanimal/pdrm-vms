import { Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementComponent } from './management/management.component';
import { ReportComponent } from './report/report.component';
import { VesselComponent } from './vessel/vessel.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { BdaComponent } from './bda/bda.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'analytics',
                component: AnalyticsComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'management',
                component: ManagementComponent
            },
            {
                path: 'report',
                component: ReportComponent
            },
            {
                path: 'vessel',
                component: VesselComponent
            },
            {
                path: 'maintenance',
                component: MaintenanceComponent
            },
            {
                path: 'bda',
                component: BdaComponent
            }
        ]
    }
]