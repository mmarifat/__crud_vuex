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
			     hide-bottom-space autofocus/>
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

@Component
export default class AddCategory extends Vue {
    showDialog: boolean = false
    from: string = null
    category: ICategory = {_id: '', name: ''}
    
    created() {
	this.$root.$on('addCategoryModalOn', (from: string) => {
	    this.from = from
	    this.showDialog = true
	})
    }
    
    saveCategory() {
	/*console.log(this.category);*/
	this.$common.storeActivity(this.$store.dispatch("setCategory", this.category), this.category.name + ' added as Category!!', null,
	    [
		this.$root.$emit(this.from == 'addPost' ? 'forAddCategory' : 'forEditCategory', this.category),
		this.showDialog = false,
		this.category = {_id: '', name: ''},
	    ])
    }
}
</script>

<style lang='scss'>

</style>
