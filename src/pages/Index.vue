<template>
  <q-page class="row">
    <q-col class="col-12 col-md-8">
      <posts/>
    </q-col>
    <q-col class="col-12 col-md-4">
      <categories/>
    </q-col>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Posts from "pages/Posts.vue";
import Categories from "pages/Categories.vue";

@Component({
  components: {Categories, Posts}
})
export default class Index extends Vue {

};
</script>
