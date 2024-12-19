<template>
  <q-page padding>
    <q-table
      :rows="rezervacije"
      :columns="columns"
      row-key="id"
      title="Rezervacije Knjiga"
    />
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const rezervacije = ref([]);
    const columns = [
      { name: 'naslov', label: 'Naslov', field: 'naslov' },
      { name: 'autor', label: 'Autor', field: 'autor' },
      { name: 'korisnik', label: 'Korisnik', field: 'korisnik' },
      { name: 'datum_rezervacije', label: 'Datum rezervacije', field: 'datum_rezervacije' },
    ];

   const fetchRezervacije = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/rezervirane_knjige');

    console.log(response.data);  // Provjerite odgovor iz backend-a
    rezervacije.value = response.data;
  } catch (error) {
    console.error('Greška prilikom dohvaćanja rezervacija:', error);
  }
};



    onMounted(() => {
      fetchRezervacije();
    });

    return {
      rezervacije,
      columns,
    };
  },
};
</script>
