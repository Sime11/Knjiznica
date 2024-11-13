<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-h4">
          Knjižnica
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>Izbornik</q-item-label>
        <q-separator spaced />

        <!-- Generiranje izbornika na temelju linkedList -->
        <q-item v-for="item in linkedList" :key="item.title" clickable @click="navigate(item.link)">
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
            <q-item-label caption>{{ item.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Importiranje useRouter

defineOptions({
  name: 'MainLayout'
})

// Definiranje stavki izbornika za projekt Knjižnica
const linkedList = [
  { title: 'Naslovnica', caption: 'Početna stranica', icon: 'home', link: '/' },
  { title: 'Popis Knjiga', caption: 'Sve knjige', icon: 'book', link: '/popis_knjiga' },
  { title: 'Pretraživanje', caption: 'Traži knjigu', icon: 'search', link: '/pretrazivanje' },
  { title: 'O nama', caption: 'Informacije o knjižnici', icon: 'info', link: '/o_nama' },
  { title: 'Lokacija', caption: 'Lokacija knjižnice', icon: 'location_on', link: '/lokacija' },
  { title: 'Login', caption: 'Prijava korisnika', icon: 'login', link: '/login' },
  { title: 'Registracija', caption: 'Registracija korisnika', icon: 'person_add', link: '/registracija' }
]

const leftDrawerOpen = ref(false)

const router = useRouter() // Inicijalizacija routera

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// Funkcija za navigaciju
function navigate(link) {
  router.push(link)
}
</script>
