import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Login } from './features/auth/pages/login/login';
import { Dashboard } from './features/admin/dashboard/pages/dashboard/dashboard';
import { Orders } from './features/admin/orders/pages/orders/orders';
import { Shops } from './features/admin/shops/pages/shops/shops';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: Login },
	{ path: 'admin/dashboard', component: AdminLayout, children: [{ path: '', component: Dashboard }] },
	{ path: 'admin/orders', component: AdminLayout, children: [{ path: '', component: Orders }] },
	{ path: 'admin/shops', component: AdminLayout, children: [{ path: '', component: Shops }] },
	{ path: '**', component: AdminLayout },
];
