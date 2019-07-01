const stores: object = {}

const StoreClass: object = {}

const files: any = require.context('./modules/', true, /\.ts$/)

files.keys().forEach((item: any) => {
  const suffix: string = item.split('/')[item.split('/').length - 1]
  const tmpLkey: any = suffix.replace(/\.ts/g, '').toLowerCase()
  const tmpStore: any = suffix.replace(/\.ts/g, 'Store')
  StoreClass[tmpStore] = files(item)[tmpStore]
  stores[tmpLkey] = files(item).default
})

export default stores

export {
  StoreClass
}