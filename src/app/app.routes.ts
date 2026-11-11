import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Login } from './features/auth/pages/login/login';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: Login },
	{
		path: 'admin/dashboard',
		component: AdminLayout,
		children: [{ path: '', loadComponent: () => import('./features/admin/dashboard/pages/dashboard/dashboard').then((m) => m.Dashboard) }],
	},
	{
		path: 'admin/orders',
		component: AdminLayout,
		children: [{ path: '', loadComponent: () => import('./features/admin/orders/pages/orders/orders').then((m) => m.Orders) }],
	},
	{
		path: 'admin/shops',
		component: AdminLayout,
		children: [{ path: '', loadComponent: () => import('./features/admin/shops/pages/shops/shops').then((m) => m.Shops) }],
	},
	{
		path: 'admin/categories',
		component: AdminLayout,
		children: [{ path: '', loadComponent: () => import('./features/admin/categories/pages/categories/categories').then((m) => m.Categories) }],
	},
	{
		path: 'admin/products',
		component: AdminLayout,
		children: [{ path: '', loadComponent: () => import('./features/admin/products/pages/products/products').then((m) => m.Products) }],
	},
	{
		path: 'admin/riders',
		component: AdminLayout,
		children: [{ path: '', loadComponent: () => import('./features/admin/riders/pages/riders/riders').then((m) => m.Riders) }],
	},
	{
		path: 'admin/cod',
		component: AdminLayout,
		children: [{ path: '', loadComponent: () => import('./features/admin/cod/pages/cod/cod').then((m) => m.Cod) }],
	},
	{
		path: 'admin/settings/delivery',
		component: AdminLayout,
		children: [{ path: '', loadComponent: () => import('./features/admin/settings/pages/delivery/delivery').then((m) => m.Delivery) }],
	},
	{ path: '**', component: AdminLayout },
];
