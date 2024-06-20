<script setup>
import RecipeForm from "../recipeForm/RecipeForm.vue";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store      = useStore();
const route      = useRoute();
const detailData = ref();
let isLoading  = false;

onMounted(async () => {
  isLoading = true;
  
  await store.dispatch("recipe/getRecipeDetail", route.params.id);

  detailData.value = computed(() => {
    return store.state.recipe.recipeDetail;
  });

  isLoading = false;
});

</script>

<template>
  <main>
    <div class="container-md my-5 py-5">
      <recipe-form v-if="detailData && !isLoading" :isEdit="true"></recipe-form>
    </div>
  </main>
</template>
