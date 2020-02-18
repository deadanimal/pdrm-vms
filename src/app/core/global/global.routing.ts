import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';

export const GlobalRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'settings',
                component: SettingsComponent
            }
        ]
    }
]