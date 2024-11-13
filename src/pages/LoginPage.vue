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
        v-model="password"
        label="Lozinka"
        type="password"
        outlined
        clearable
      />
    </div>

    <q-btn label="Potvrdi" color="primary" @click="login" />
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const username = ref('');
    const password = ref('');

    const login = () => {
      if (username.value && password.value) {
        // Ovdje možete dodati logiku za prijavu
        alert(`Prijava uspješna za korisnika: ${username.value}`);
      } else {
        alert('Molimo unesite korisničko ime i lozinku.');
      }
    };

    return {
      username,
      password,
      login
    };
  }
};
</script>

