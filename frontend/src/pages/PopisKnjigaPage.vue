<template>

  <div class="popis-knjiga-page">
    <q-table
      :rows="books"
      :columns="columns"
      row-key="id"
      :pagination="pagination"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const columns = [
  {
    name: 'id',
    label: 'ID',
    align: 'left',
    field: row => row.id,
    sortable: true
  },
  {
    name: 'title',
    label: 'Naziv',
    align: 'left',
    field: row => row.title,
    sortable: true
  },
  {
    name: 'author',
    label: 'Autor',
    align: 'left',
    field: row => row.author,
    sortable: true
  },
  {
    name: 'year',
    label: 'Godina izdanja',
    align: 'left',
    field: row => row.year,
    sortable: true
  }
];

const books = ref([
  { id: 1, title: 'Knjiga 1', author: 'Autor 1', year: 2022 },
  { id: 2, title: 'Knjiga 2', author: 'Autor 2', year: 2019 },
  { id: 3, title: 'Knjiga 3', author: 'Autor 3', year: 2018 },
  { id: 4, title: 'Knjiga 4', author: 'Autor 4', year: 2021 }
]);

const pagination = ref({
  page: 1,
  rowsPerPage: 5
});
</script>

<style scoped>
.popis-knjiga-page {
  padding: 20px;
}
</style>