import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'create-employee', 
    loadComponent: () => import('./components/employee-form/employee-form.component').then(m => m.EmployeeFormComponent)
    }
];
