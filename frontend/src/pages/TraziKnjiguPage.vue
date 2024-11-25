<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-input
        v-model="searchQuery"
        label="Unesite naziv ili autora knjige"
        outlined
        clearable
      />

      <div class="q-my-md">
        <q-checkbox v-model="searchByTitle" label="Pretraži po naslovu" />
        <q-checkbox v-model="searchByAuthor" label="Pretraži po autoru" />
      </div>

      <q-btn label="Traži" color="primary" @click="performSearch" />

      <q-table
        v-if="filteredBooks.length"
        :rows="filteredBooks"
        :columns="columns"
        row-key="id"
        title="Rezultati Pretraživanja"
        class="q-mt-md"
      />
    </div>
  </q-page>
</template>


<script>
import { ref } from 'vue';

export default {
  setup() {
    const searchQuery = ref('');
    const searchByTitle = ref(true);
    const searchByAuthor = ref(false);

    const columns = [
      { name: 'id', label: 'ID', align: 'left', field: row => row.id },
      { name: 'naslov', label: 'Naslov', align: 'left', field: row => row.naslov },
      { name: 'autor', label: 'Autor', align: 'left', field: row => row.autor },
      { name: 'opis', label: 'Opis', align: 'left', field: row => row.opis },
      { name: 'stanje', label: 'Stanje', align: 'right', field: row => row.stanje }
    ];

    const books = [
      { id: 1, naslov: 'Knjiga 1', autor: 'Autor 1', opis: 'knjiga 1.', stanje: 10 },
      { id: 2, naslov: 'Knjiga 2', autor: 'Autor 2', opis: 'knjiga 2.', stanje: 4 },
      { id: 3, naslov: 'Knjiga 3', autor: 'Autor 3', opis: 'knjiga 3.', stanje: 6 },
      { id: 4, naslov: 'Knjiga 4', autor: 'Autor 4', opis: 'knjiga 4.', stanje: 8 }
    ];

    const filteredBooks = ref([]);

    const performSearch = () => {
      if (!searchQuery.value) {
        filteredBooks.value = [];
        return;
      }
      filteredBooks.value = books.filter(book => {
        const matchesTitle = searchByTitle.value && book.naslov.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesAuthor = searchByAuthor.value && book.autor.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesTitle || matchesAuthor;
      });
    };

    return {
      searchQuery,
      searchByTitle,
      searchByAuthor,
      columns,
      books,
      filteredBooks,
      performSearch
    };
  }
};
</script>