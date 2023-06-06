import { createRouter, createWebHistory } from 'vue-router';

import Login from './views/LoginView.vue'
import NotFound from './views/NotFoundView.vue'
import RegisterAccount from './views/RegisterAccountView.vue'
import ListNote from './views/ListNoteView.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Login },
  { path: '/createaccount', component: RegisterAccount },
  { path: '/listnote', component: ListNote },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;