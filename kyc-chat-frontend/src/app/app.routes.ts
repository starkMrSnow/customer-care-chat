import { Routes } from '@angular/router';
import { AdminChat } from './components/admin-chat/admin-chat';
import { CustomerChat } from './components/customer-chat/customer-chat';
import { WelcomeScreen } from './components/welcome-screen/welcome-screen'; 
export const routes: Routes = [
  { path: 'welcome', component: WelcomeScreen },
  { path: 'customer-chat', component: CustomerChat },
  { path: 'admin-chat', component: AdminChat },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }, 
];
