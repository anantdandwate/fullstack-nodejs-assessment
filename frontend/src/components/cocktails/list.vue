<template>
  <div>
    <h1>Cocktails List</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <label for="search">Search by description:</label>
      <input type="text" id="search" v-model="search" />
      <ul>
        <li v-for="item in filteredData" :key="item.id">
          <router-link :to="`/cocktails/${item.id}`">
            <strong>{{ item.title }}</strong>
          </router-link>
          price: {{ item.price }}€
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';

export default {
  name: 'NewCocktail',
  setup() {
    const data = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const search = ref('');

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/cocktails');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        data.value = jsonData;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };
    const filteredData = computed(() => {
      if (!search.value.trim()) {
        return data.value;
      }
      return data.value.filter(item =>
        item.description.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    onMounted(fetchData);

    return {
      data,
      filteredData,
      search,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>