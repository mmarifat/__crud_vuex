<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="width: 500px; max-width: 90vw;">
      <q-form greedy @submit.prevent="editCategory">
        <q-linear-progress color="info" :value="1"/>
        <q-card-section class="text-bold text-h6 text-center q-py-xs">
          Edit Category
        </q-card-section>
        <q-card-section>
          <q-input :rules="[$common.rules.required]" label="Name" stack-label v-model="category.name" dense hide-bottom-space/>
        </q-card-section>
        <q-card-actions align="right" class="row">
          <q-btn color="red-10" @click="modalClose" flat label="Close" class="col-12 col-md-auto order-xs-last"/>
          <q-btn color="dark" label="Edit" class="col-12 col-md-auto order-last" type="submit"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang='ts'>
import {Component, Vue} from "vue-property-decorator";
import {ICategory} from "src/interfaces/IEssentials";
import {showNotification} from "boot/helper";

@Component
export default class EditCategory extends Vue {
  showDialog: boolean = false
  category: ICategory = {_id: '', name: ''}
  old = this.category

  mounted() {
    this.$root.$on('editCategoryModalOn', (row: ICategory) => {
      this.$common.duplicate(this.old, row)
      this.category = row
      this.showDialog = true
    })
  }

  editCategory() {
    new Promise(async resolve => {
      resolve(await this.$store.commit('editCategory', this.category))
    }).then(() => {
      this.showDialog = false
    }).finally(() => {
      showNotification(this.category.name + ' Edited!!')
    })
  }

  modalClose() {
    this.$common.duplicate(this.category, this.old)
    this.showDialog = false
  }
}
</script>

<style lang='scss'>

</style>
