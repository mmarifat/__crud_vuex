<template>
    <q-dialog v-model="showDialog" persistent>
	<q-card style="width: 600px; max-width: 90vw;">
	    <q-form greedy @submit.prevent="$common.storeActivity($store.dispatch('editPost', post),
      post.name + ' Edited!!', null, [showDialog = false])">
		<q-linear-progress color="info" :value="1"/>
		<q-card-section class="text-bold text-h6 text-center q-py-xs">
		    Edit Post
		</q-card-section>
		<q-card-section>
		    <q-row class="q-col-gutter-md">
			<q-col class="col-12">
			    <q-input :rules="[$common.rules.required]" label="Name" stack-label v-model="post.name" dense
				     hide-bottom-space autofocus/>
			</q-col>
			<q-col class="col-12">
			    <q-select :options="categoriesOptions" @filter="filterCategory" :rules="[$common.rules.required]" input-debounce="500ms"
				      label="Category" map-options option-label="name" option-value="_id" emit-value stack-label use-input multiple
				      transition-show="flip-up" transition-hide="scale" dense options-dense behavior="menu" use-chips
				      v-model="post.category">
				<template v-slot:no-option>
				    <q-item>
					<q-item-section class="text-grey">
					    No category!!
					</q-item-section>
				    </q-item>
				</template>
			    </q-select>
			</q-col>
			<q-col class="col-12">
			    <q-input :rules="[$common.rules.required]" label="Description" stack-label v-model="post.description" dense
				     hide-bottom-space type="textarea" row="20"/>
			</q-col>
		    </q-row>
		</q-card-section>
		<q-card-actions align="right" class="row">
		    <q-btn color="negative" @click="modalClose" flat label="Close" class="col-12 col-md-auto order-xs-last"/>
		    <q-btn color="primary" label="Edit" class="col-12 col-md-auto order-last" type="submit"/>
		</q-card-actions>
	    </q-form>
	</q-card>
    </q-dialog>
</template>

<script lang='ts'>
import {Component, Vue, Watch} from "vue-property-decorator";
import {CCategory, ICategory, IPost} from "src/interfaces/IEssentials";

@Component
export default class EditPost extends Vue {
    showDialog: boolean = false
    categoriesOptions: Array<ICategory> = this.$store.getters.Categories
    post: IPost = {_id: '', name: '', category: [], description: ''}
    old = this.post
    
    created() {
	this.$root.$on('editPostModalOn', (row: IPost) => {
	    this.$common.duplicate(this.old, row)
	    this.post = row
	    this.post.category = this.post.category.filter((each: any) => {
		if (this.$store.getters.Categories.length > 1)
		    return this.$store.getters.Categories.find((f: ICategory) => f._id === each)
	    })
	    this.showDialog = true
	})
	
	this.$root.$on('forEditCategory', (category: ICategory) => {
	    this.categoriesOptions = this.$store.getters.Categories
	    this.post.category.push(category._id)
	})
    }
    
    filterCategory(val: string, update: Function) {
	update(() => {
	    const needle = val.toLowerCase()
	    this.categoriesOptions = this.$store.getters.Categories.filter((v: any) => v.name.toLowerCase().indexOf(needle) > -1)
	})
    }
    
    @Watch('post.category')
    onCreateNewCategory() {
	const createNew: number = this.post.category.indexOf(CCategory.New)
	if (createNew > -1) {
	    new Promise(resolve => {
		resolve(this.$root.$emit('addCategoryModalOn', 'editPost'))
	    }).then(() => {
		this.post.category.splice(createNew, 1)
	    })
	}
    }
    
    modalClose() {
	this.$common.duplicate(this.post, this.old)
	this.showDialog = false
    }
    
}
</script>

<style lang='scss'>
.q-virtual-scroll__content .q-item:first-child {
    font-weight: bold;
}
</style>
