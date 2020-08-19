<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="width: 400px; max-width: 90vw;">
      <q-form greedy @submit.prevent="saveCategory">
        <q-linear-progress color="positive" :value="1"/>
        <q-card-section class="text-bold text-h6 text-center q-py-xs">
          New Category
        </q-card-section>
        <q-card-section>
          <q-input :rules="[$common.rules.required]" label="Name" stack-label v-model="category.name" dense
                   hide-bottom-space/>
        </q-card-section>
        <q-card-actions align="right" class="row">
          <q-btn color="red-10" @click="showDialog = false" flat label="Close" class="col-12 col-md-auto order-xs-last"/>
          <q-btn color="dark" label="Save" class="col-12 col-md-auto order-last" type="submit"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang='ts'>
import {Component, Vue} from "vue-property-decorator";
import {ICategory} from "src/interfaces/IEssentials";
import {showNotification} from "boot/helper";
import uniqid from 'uniqid'

@Component
export default class AddCategory extends Vue {
  showDialog: boolean = false
  from: string = null
  category: ICategory = {_id: '', name: ''}

  created() {
    this.$root.$on('addCategoryModalOn', (from: string) => {
      this.category._id = uniqid()
      this.from = from
      this.showDialog = true
    })
  }

  saveCategory() {
    /*console.log(this.category);*/
    new Promise(async resolve => {
      resolve(await this.$store.commit('setCategory', this.category))
    }).then(() => {
      showNotification(this.category.name + ' Added as Category!!')
      if (this.from === 'addPost')
        this.$root.$emit('forAddCategory', this.category)
      else if (this.from === 'editPost')
        this.$root.$emit('forEditCategory', this.category)
        this.category = {_id: '', name: ''}
    }).finally(() => {
      this.showDialog = false
    })
  }
}
</script>

<style lang='scss'>

</style>
