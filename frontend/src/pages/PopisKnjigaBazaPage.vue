<template>
  <q-page padding>
    <q-table
      title="Popis knjiga"
      :rows="books"
      :columns="columns"
      row-key="id"
    />
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios'; // Importaj axios instancu iz boot datoteke

export default {
  setup() {
    const books = ref([]); // Reaktivni podatak za knjige

    
const fetchBooks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/rezervirane_knjige'); // Provjerite URL
    books.value = response.data;
  } catch (error) {
    console.error('Greška prilikom dohvaćanja rezervacija:', error);
  }
};


    onMounted(() => {
      fetchBooks(); // Poziv funkcije prilikom montiranja komponente
    });

    const columns = [
      { name: 'id', label: 'ID', field: 'id' },
      { name: 'naslov', label: 'Naslov', field: 'naslov' },
      { name: 'autor', label: 'Autor', field: 'autor' },
      { name: 'stanje', label: 'Stanje', field: 'stanje' }
    ];

    return {
      books,
      columns
    };
  }
};
</script>
