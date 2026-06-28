<template>
    <div v-if="loading">Loading...</div>

    <div v-else-if="error">
        {{ error }}
    </div>

    <div v-else>
        <h1>{{ cocktail.title }}</h1>
        <p><strong>Price:</strong> {{ cocktail.price }} €</p>
        <p><strong>Description:</strong> {{ cocktail.description }}</p>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'CocktailDetail',

    setup() {
        const route = useRoute();
        const cocktail = ref(null);
        const loading = ref(true);
        const error = ref(null);

        const fetchCocktail = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/cocktails/${route.params.id}`
                );

                if (!response.ok) {
                    throw new Error('Cocktail not found');
                }

                cocktail.value = await response.json();
            } catch (err) {
                error.value = err.message;
            } finally {
                loading.value = false;
            }
        };

        onMounted(fetchCocktail);

        return {
            cocktail,
            loading,
            error,
        };
    },
};
</script>