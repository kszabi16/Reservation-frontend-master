import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';
import { MiniLayoutComponent } from './features/mini-sidebar/mini-sidebar';

// Property modul komponensek
import { PropertyCreateComponent } from './features/properties/property-create/property-create.component';
import { PropertyEditComponent } from './features/properties/property-edit/property-edit.component';
import { PropertyAdminComponent } from './features/properties/property-admin/property-admin.component';


export const routes: Routes = [
  // Publikus oldalak
  { path: '', pathMatch: 'full', redirectTo: 'public-dashboard' },


  {
  path: 'auth',
  component: MiniLayoutComponent,   // csak a mini-sidebar + auth oldalak
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]
},

  // Layout alatti oldalak
  {
    path: '',
    component: LayoutComponent,
    children: [
      // PUBLIC + USER dashboard
      {
        path: 'public-dashboard',
        loadComponent: () =>
          import('./features/dashboards/public-dashboard/public-dashboard').then(
            (m) => m.PublicDashboardComponent
          ),
      },

      {
        path: 'bookings-create',
        //canActivate: [authGuard('User','Host')],
        loadComponent: () =>
          import('./features/bookings/booking-create-component/booking-create-component').then(
            (m) => m.BookingCreateComponent
          ),
       
      },
        {
        path: 'bookings-list',
        //canActivate: [authGuard('User')],
        loadComponent: () =>
          import('./features/bookings/booking-list-component/booking-list-component').then(
            (m) => m.BookingListComponent
          ),
       
      },
        {
        path: 'bookings-admin',
        //canActivate: [authGuard('Admin')],
        loadComponent: () =>
          import('./features/bookings/booking-admin-component/booking-admin-component').then(
            (m) => m.BookingAdminComponent
          ),
       
      },
        {
        path: 'bookings-host',
        //canActivate: [authGuard('Admin','Host')],
        loadComponent: () =>
          import('./features/bookings/booking-host-component/booking-host-component').then(
            (m) => m.BookingHostComponent
          ),
       
      },
      
      {
        path: 'user-dashboard',
        //canActivate: [authGuard('User')],
        loadComponent: () =>
          import('./features/dashboards/user-dashboard/user-dashboard').then(
            (m) => m.UserDashboardComponent
          ),
        // nincs guard → anonymous is mehet
      },{
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'notifications', 
        //canActivate: [authGuard('User,Host')],
        loadComponent: () =>
          import('./features/notifications/notifications.component').then(
            (m) => m.NotificationsComponent
          ),
      },
      {
        path: 'messages', 
        //canActivate: [authGuard('User,Host')],
        loadComponent: () =>
          import('./features/messages/messages.component').then(
            (m) => m.MessagesComponent
          ),
      },
      {
        path: 'calendar',
        //canActivate: [authGuard('User,Host')],
        loadComponent: () =>
          import('./features/calendar/calendar.component').then(
            (m) => m.CalendarComponent
          ),
      },
      {
        path: 'property/:id',
        loadComponent: () =>
          import('./features/properties/property-detail/property-public-detail.component').then(
            (m) => m.PropertyPublicDetailComponent
          ),
      },

      // HOST dashboard
      {
        path: 'host-dashboard',
        //canActivate: [authGuard('Host')],
        loadComponent: () =>
          import('./features/dashboards/host-dashboard/host-dashboard').then(
            (m) => m.HostDashboardComponent
          ),
      },
      {
        path: 'host-all-properties',
        //canActivate: [authGuard('Host')],
        loadComponent: () =>
          import('./features/dashboards/host-dashboard/host-all-properties').then(
            (m) => m.HostAllPropertiesComponent
          ),
      },

      // Admin-only
      {
        path: 'host-requests',
        //canActivate: [authGuard('Admin')],
        loadComponent: () =>
          import('./features/host-requests/host-request-admin.component').then(
            (m) => m.HostRequestAdminComponent
          ),
      },
      {
        path: 'admin-dashboard',
        //canActivate: [authGuard('Admin')],
        loadComponent: () =>
          import('./features/dashboards/admin-dashboard/admin-dashboard').then(
            (m) => m.AdminDashboardComponent
          ),
      },

      // profile (logged-in bármelyik user)
      {
        path: 'profile',
        //canActivate: [authGuard()],
        loadComponent: () =>
          import('./features/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },

      // properties oldal (host/admin)
 
      // Create/edit/admin – roles
      {
        path: 'property/create',
        component: PropertyCreateComponent,
        //canActivate: [authGuard('User,Host')],
      },
      {
        path: 'property/edit/:id',
        component: PropertyEditComponent,
        //canActivate: [authGuard('Host')],
      },
      {
        path: 'property/admin',
        component: PropertyAdminComponent,
        //canActivate: [authGuard('Admin')],
      },
    ],
  },

  // 404 fallback
  { path: '**', redirectTo: 'public-dashboard' },
];

