<template>
  <q-layout view="hHh lpR fFf">
    <!-- Gornji toolbar s dugmetom za bočni izbornik -->
    <q-header elevated>
      <q-toolbar>
        <!-- Dugme za otvaranje bočnog izbornika -->
        <q-btn flat round icon="menu" @click="toggleDrawer" aria-label="Menu" />

        <!-- Naslov -->
        <q-toolbar-title>
          Knjiznica
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Bočni izbornik -->
<q-drawer v-model="drawer" show-if-above>
  <q-list>
    <q-item clickable v-ripple to="/">
      <q-item-section>Početna</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/popis-knjiga">
      <q-item-section>Popis knjiga</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/pretrazivanje">
      <q-item-section>Pretraživanje</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/o-nama">
      <q-item-section>O nama</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/lokacija">
      <q-item-section>Lokacija</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/login">
      <q-item-section>Login</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/registracija">
      <q-item-section>Registracija</q-item-section>
    </q-item>
    <!-- Dodana stavka za rezervacije -->
    <q-item clickable v-ripple to="/rezervacije">
      <q-item-section>Rezervacije</q-item-section>
    </q-item>
  </q-list>
</q-drawer>


    <!-- Glavni sadržaj -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: false, // Kontrola za otvaranje/zatvaranje bočnog izbornika
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer; // Mijenja stanje bočnog izbornika
    },
  },
};
</script>

<style lang="scss" scoped>
/* Stilovi za bolji izgled */
.q-toolbar-title {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
