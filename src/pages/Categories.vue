<template>
    <section class="column full-width q-pa-sm">
	<q-table title="Posts" :data="$store.getters.Categories.filter(f => f._id !== cCategory.New)" :columns="columns" row-key="_id" virtual-scroll
		 :pagination.sync="pagination" :rows-per-page-options="[0]" binary-state-sort card-class="full-width" class="table-style" wrap-cells>
	    <template v-slot:no-data="{ icon, message, filter }">
		<div class="full-width row flex-center text-accent text-h5">
		    <q-icon color="warning" :name="filter ? 'filter_b_and_w' : icon" size="2em"/>
		    <span>No data to show!</span>
		</div>
	    </template>
	    
	    <template v-slot:body-cell-action="{value,row}">
		<q-td>
		    <q-icon color="dark" name="menu_open" size="sm" class="cursor-pointer">
			<q-menu anchor="top left" self="top right">
			    <q-item @click="$root.$emit('editCategoryModalOn', row)" clickable dense style="min-width: 100px!important;">
				<q-item-section v-close-popup>
				    Edit
				</q-item-section>
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
						<q-btn color="negative" v-close-popup glossy label="Yes"
						       @click="$common.storeActivity($store.dispatch('removeCategory', row),
						       row.name + ' Deleted!!','negative')"/>
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
		    <span>Categories</span>
		    <q-space/>
		    <q-btn color="secondary" icon="add_circle_outline" push no-caps dense @click="$root.$emit('addCategoryModalOn','categories')"/>
		</q-row>
	    
	    </template>
	</q-table>
    </section>
</template>

<script lang='ts'>
import {Component, Vue} from "vue-property-decorator";
import {CCategory} from "src/interfaces/IEssentials";

@Component
export default class Categories extends Vue {
    cCategory = CCategory
    pagination: any = {
	rowsPerPage: 0
    }
    
    columns: Array<any> = ['name'].map(each => {
	return {name: each, field: each, align: 'left', sortable: true, required: true, label: this.$common.capitalizeFirstLetter(each)}
    })
    
    created() {
	this.columns.push({label: '#', name: 'action', field: '_id', align: 'left'})
    }
}
</script>

<style lang='scss'>

</style>
