export interface ICommon {
  rules: {
    required(value: any): boolean | string
  },

  capitalizeFirstLetter(text: string): string,

  console(): void,

  copyText(text: string, field?: string): void,

  duplicate(target: any, base: any): any,

  reset(object: any, def?: any): any
}

export interface IPost {
  _id?: string
  name: string
  description: string
  category: Array<ICategory> | any
}

export interface ICategory {
  _id?: any
  name: string
}

export enum CCategory {
  New = 'Create New Category'
}

export enum CRoutes {
  HOME = "home",
  CATEGORIES = "categories",
  POSTS = "posts"
}
