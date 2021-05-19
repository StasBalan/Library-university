import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// import Home from "../views/Home.vue";
import Books from '@/views/Books/index.vue';
import BooksAdding from '@/views/Books/adding.vue';
import BooksEdit from '@/views/Books/edit.vue';
import Readers from '@/views/Readers/index.vue';
import ReadersAdding from '@/views/Readers/adding.vue';
import ReadersEdit from '@/views/Readers/edit.vue';
import ReadersWatch from '@/views/Readers/watch.vue';
import Writers from '@/views/Writers/index.vue';
import WritersAdding from '@/views/Writers/adding.vue';
import WritersEdit from '@/views/Writers/edit.vue';
import ReaderBooks from '@/views/ReaderBooks/index.vue';
import ReaderBooksAdding from '@/views/ReaderBooks/adding.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/books/adding',
    name: 'BooksAdding',
    component: BooksAdding
  },
  {
    path: '/books/edit/:id',
    name: 'BooksEdit',
    component: BooksEdit
  },
  {
    path: '/readers',
    name: 'Readers',
    component: Readers
  },
  {
    path: '/readers/adding',
    name: 'ReadersAdding',
    component: ReadersAdding
  },
  {
    path: '/readers/edit/:id',
    name: 'ReadersEdit',
    component: ReadersEdit
  },
  {
    path: '/readers/watch/:id',
    name: 'ReadersWatch',
    component: ReadersWatch
  },
  {
    path: '/writers',
    name: 'Writers',
    component: Writers
  },
  {
    path: '/writers/adding',
    name: 'WritersAdding',
    component: WritersAdding
  },
  {
    path: '/writers/edit/:id',
    name: 'WritersEdit',
    component: WritersEdit
  },
  {
    path: '/reader-books',
    name: 'ReaderBooks',
    component: ReaderBooks
  },
  {
    path: '/reader-books/adding',
    name: 'ReaderBooksAdding',
    component: ReaderBooksAdding
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.name) {
    next({ name: 'Books' });
  }

  next();
})

export default router;
