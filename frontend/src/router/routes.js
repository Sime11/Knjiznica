const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/popis-knjiga', component: () => import('pages/PopisKnjigaPagePrimjer.vue') },
      { path: '/pretrazivanje', component: () => import('pages/TraziKnjiguPage.vue') },
      { path: '/o-nama', component: () => import('pages/ONamaPage.vue') },
      { path: '/lokacija', component: () => import('pages/LokacijaPage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/registracija', component: () => import('pages/RegistracijaPage.vue') },
      { path: '/popis-knjiga-baza',component: () => import('pages/PopisKnjigaBazaPage.vue')},
      { path: '/rezervacije',component: () => import('pages/RezervacijaPage.vue')

        }


      
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
