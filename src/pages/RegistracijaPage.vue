<template>
  <q-page class="q-pa-md">
    <div class="q-mb-md">
      <q-input
        v-model="username"
        label="Korisničko ime"
        outlined
        clearable
      />
    </div>

    <div class="q-mb-md">
      <q-input
        v-model="email"
        label="Email"
        type="email"
        outlined
        clearable
      />
    </div>

    <div class="q-mb-md">
      <q-input
        v-model="password"
        label="Lozinka"
        type="password"
        outlined
        clearable
      />
    </div>

    <q-btn label="Potvrdi" color="primary" @click="register" />
  </q-page>
</template>


<script>
import { ref } from 'vue';

export default {
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');

    const register = () => {
      if (username.value && email.value && password.value) {
        // Ovdje možete dodati logiku za registraciju
        alert(`Registracija uspješna za korisnika: ${username.value}`);
      } else {
        alert('Molimo popunite sva polja.');
      }
    };

    return {
      username,
      email,
      password,
      register
    };
  }
};
</script>

