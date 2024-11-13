
<template>
  <q-page>
    <q-table
      :rows="books"
      :columns="columns"
      row-key="id"
      title="Popis Knjiga"
    />
  </q-page>
</template>

<script>
export default {
  setup() {
    const columns = [
      { name: 'id', label: 'ID', align: 'left', field: row => row.id },
      { name: 'naslov', label: 'Naslov', align: 'left', field: row => row.naslov },
      { name: 'autor', label: 'Autor', align: 'left', field: row => row.autor },
      { name: 'opis', label: 'Opis', align: 'left', field: row => row.opis },
      { name: 'slika', label: 'Slika', align: 'center', field: row => row.slika, sortable: false },
      { name: 'stanje', label: 'Stanje', align: 'right', field: row => row.stanje }
    ];

    const books = [
      { id: 1, naslov: 'Povijest Svijeta', autor: 'Ivan Horvat', opis: 'Knjiga o povjesti.', slika: 'slika1', stanje: 10 },
      { id: 2, naslov: 'Tajne Prirode', autor: 'Ana Kovač', opis: 'Knjiga o prirodi.', slika: 'slika2', stanje: 4 },
      { id: 3, naslov: 'Put u Svemir', autor: 'Marko Novak', opis: 'Knjiga o svemiru.', slika: 'slika3', stanje: 6 },
      { id: 4, naslov: 'Čuda Tehnologije', autor: 'Lucija Babić', opis: 'Knjiga o tehnologiji.', slika: 'slika4', stanje: 8 }
    ];

    return {
      columns,
      books
    };
  }
};
</script>

