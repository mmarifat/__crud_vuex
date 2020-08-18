<template>
  <section class="column full-width q-pa-sm">
    <q-table title="Posts" :data="$store.getters.Posts" :columns="columns" row-key="_id" virtual-scroll :pagination.sync="pagination"
             :rows-per-page-options="[0]"
             binary-state-sort card-class="full-width" class="table-style" wrap-cells>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent text-h5">
          <q-icon color="warning" :name="filter ? 'filter_b_and_w' : icon" size="2em"/>
          <span>No data to show!</span>
        </div>
      </template>

      <template v-slot:body-cell-category="{value}">
        <td>
          <q-chip size="sm" color="negative" text-color="white" v-if="!matchCategories(value)">
            N / A
          </q-chip>
          <q-chip v-else size="sm" color="indigo-14" text-color="white" v-for="each in matchCategories(value)" :key="Math.random()">
            {{ each.name }}
          </q-chip>
        </td>
      </template>

      <template v-slot:body-cell-action="{value,row}">
        <q-td>
          <q-icon color="dark" name="menu_open" size="sm" class="cursor-pointer">
            <q-menu anchor="top left" self="top right">
              <q-item @click="$root.$emit('editPostModalOn', row)" clickable dense>
                <q-item-section v-close-popup>Edit</q-item-section>
              </q-item>
              <q-item clickable dense>
                <q-item-section>
                  <div>Delete</div>
                  <q-popup-proxy :breakpoint="700">
                    <q-banner dense>
                      <template v-slot:avatar>
                        <q-icon color="negative" name="delete_forever"/>
                      </template>
                      Are you sure to delete `{{ row.name }}`
                      <template v-slot:action>
                        <q-btn color="negative" v-close-popup @click="deletePost(row)" glossy label="Yes"/>
                        <q-btn color="secondary" v-close-popup glossy label="No"/>
                      </template>
                    </q-banner>
                  </q-popup-proxy>
                </q-item-section>
              </q-item>
            </q-menu>
          </q-icon>
        </q-td>
      </template>

      <template v-slot:top="{pagination}">
        <q-row>
          <span>Posts</span>
          <q-space/>
          <q-btn dense color="primary" icon="add" push no-caps @click="$root.$emit('addPostModalOn')"/>
        </q-row>
      </template>

    </q-table>
  </section>
</template>

<script lang='ts'>
import {Component, Vue} from "vue-property-decorator";
import {ICategory, IPost} from "src/interfaces/IEssentials";
import {showNotification} from "boot/helper";

@Component
export default class Posts extends Vue {
  pagination: any = {
    rowsPerPage: 0
  }

  columns: Array<any> = ['name', 'category', 'description'].map(each => {
    return {name: each, field: each, align: 'left', sortable: true, required: true, label: this.$common.capitalizeFirstLetter(each)}
  })

  created() {
    this.columns.push({
      label: '#',
      name: 'action',
      field: '_id',
      align: 'left',
    })
  }

  async deletePost(row: IPost) {
    await this.$store.commit("removePost", row)
    showNotification(row.name + ' Deleted!!', 'negative')
  }

  matchCategories(all: any) {
    let ret = all.map((m: any) => {
      return this.$store.getters.Categories.find((e: ICategory) => e._id === m)
    })
    if (ret[0]) return ret
    else return false
  }
}
</script>

<style lang='scss'>

</style>
