import { createRouter, createWebHistory } from 'vue-router';
import MarkdownParser from '../components/MarkdownParser.vue';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:category/:page',
    name: 'MarkdownPageWithCategory',
    component: MarkdownParser,
    props: true
  },
  {
    path: '/:page',
    name: 'MarkdownPage',
    component: MarkdownParser,
    props: route => ({ page: route.params.page, category: 'root' })
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.path);
  console.log('Route params:', to.params);
  next();
});

export default router;
