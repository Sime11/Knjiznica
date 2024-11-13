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
      { id: 1, naslov: 'Povijest Svijeta', autor: 'Ivan Horvat', opis: 'Detaljna kronika povijesti od prapovijesti do modernog doba.', stanje: 10 },
      { id: 2, naslov: 'Tajne Prirode', autor: 'Ana Kovač', opis: 'Otkrivanje najdubljih tajni prirode i njezinih zakona.', stanje: 4 },
      { id: 3, naslov: 'Put u Svemir', autor: 'Marko Novak', opis: 'Avantura kroz galaksiju s nevjerojatnim otkrićima.', stanje: 6 },
      { id: 4, naslov: 'Čuda Tehnologije', autor: 'Lucija Babić', opis: 'Pregled najvažnijih tehnoloških dostignuća današnjice.', stanje: 8 }
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
