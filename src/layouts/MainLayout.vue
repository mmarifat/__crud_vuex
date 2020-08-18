<template>
  <q-layout view="lHr lpR lFr">

    <q-header reveal elevated class="bg-grey-2 text-black">
      <q-toolbar>
        <q-toolbar-title @click="gotoHome">
          <q-avatar>
            <q-img src="icons/favicon-128x128.png"/>
          </q-avatar>
          <span class="q-pa-sm text-overline-header">CRUD</span>
        </q-toolbar-title>
        <q-space/>
        <q-btn class="q-ma-xs" size="sm" label="Posts" color="dark" :to="{name: cRoutes.POSTS}"/>
        <q-btn class="q-ma-xs" size="sm" label="Categories" color="indigo-10" :to="{name: cRoutes.CATEGORIES}"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
      <add-post/>
      <edit-post/>
      <add-category/>
      <edit-category/>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {CRoutes} from "src/interfaces/IEssentials";
import AddPost from "components/AddPost.vue";
import AddCategory from "components/AddCategory.vue";
import EditCategory from "components/EditCategory.vue";
import EditPost from "components/EditPost.vue";

@Component({
  components: {EditPost, EditCategory, AddCategory, AddPost}
})
export default class MainLayout extends Vue {
  cRoutes = CRoutes

  gotoHome() {
    if (this.$router.currentRoute.name !== this.cRoutes.HOME)
      this.$router.push({name: this.cRoutes.HOME})
  }
}
</script>

<style lang="scss">
.q-toolbar__title {
  cursor: pointer;
}
</style>
