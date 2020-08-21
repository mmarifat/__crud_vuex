import {Loading, Notify} from "quasar";
import {boot} from "quasar/wrappers";
import QRow from "components/core/QRow.vue";
import QCol from "components/core/QCol.vue";
import {ICommon} from "src/interfaces/IEssentials";
import {Route} from "vue-router/types/router";

export const common: ICommon = {
	rules: {
		required: (v: any) => {
			return (v !== null && v !== undefined ? !!v.toString().length : false) || 'Field is required!'
		}
	},
	capitalizeFirstLetter: (string: string) => {
		return string.length ? string[0].toUpperCase() + string.slice(1) : '';
	},

	console() {
		console.log(arguments);
	},

	duplicate(target: any, base: any) {
		if (base) {
			Object.keys(target).forEach(key => {
				if (key !== '_id') {
					if (Array.isArray(base[key])) {
						target[key] = base[key]
					} else if (typeof base[key] == "object") {
						common.duplicate(target[key], base[key]);
					} else {
						target[key] = base[key] || target[key]
					}
				}
			})
		}
		return target;
	},

	storeActivity(activity: any, notifyMsg?: string, notifyType?: string, then?: Array<any>) {
		return new Promise(async resolve => {
			resolve(activity)
		}).then(() => {
			if (then) {
				if (Array.isArray(then)) {
					then.forEach(each => {
						each
					})
				}
			}
			if (notifyMsg) showNotification(notifyMsg, notifyType || 'positive')
		})
	}
}

declare module 'vue/types/vue' {
	interface Vue {
		$common: ICommon
	}
}

export default boot(({Vue, router}: any) => {
	Vue.component('QRow', QRow);
	Vue.component('QCol', QCol);
	Vue.prototype.$common = common
	router.beforeEach((to: Route, from: Route, next: any) => {
		document.title = to.meta.title(to) + " :: CRUD"
		Loading.show();
		next()
	})
	router.afterEach(() => {
		Loading.hide();
	})
})

export function showNotification(message: string, type?: string) {
	Notify.create({
		message, type: type || 'positive', group: "temp"
	})
}
