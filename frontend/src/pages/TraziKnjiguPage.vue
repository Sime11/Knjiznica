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
      { id: 1, naslov: 'Funny Story', autor: 'Emily Henry', opis: 'The romance novel follows librarian Daphne and Miles, whose exes are dating each other.', stanje: 15 },
      { id: 2, naslov: 'The Lord of the Rings', autor: 'J. R. R. Tolkien', opis: 'A modest hobbit is entrusted with the task of destroying a powerful ring.', stanje: 5 },
      { id: 3, naslov: 'Harry Potter and the Order of the Phoenix', autor: 'J.K. Rowling', opis: 'In his fifth year at Hogwart\'s, Harry faces challenges at every turn.', stanje: 10 },
      { id: 4, naslov: 'Diary of a Wimpy Kid: Hard Luck', autor: 'Jeff Kinney', opis: 'His best friend, Rowley Jefferson, has ditched him, and finding new friends in middle school.', stanje: 8 }
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