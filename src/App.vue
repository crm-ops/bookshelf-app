<template>
  <v-app>
    <v-app-bar
      app
      color="#4DB6AC"
      dark
    >
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <BookShelf/>
    </v-main>
  </v-app>
</template>

<script>
import BookShelf from './components/BookShelf.vue';

export default {
  name: 'App',

  components: {
    BookShelf,
    
  },

  data: () => ({
    //
  }),
  
};
</script>
