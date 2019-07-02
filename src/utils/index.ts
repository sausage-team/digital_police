export default class Util {

  public static getHrefMap (search: string) {
    if (search) {
      const searchCon: string = search.split('?')[1]
      const searchItem: string[] = searchCon.split('&')
      const res: any = {}

      searchItem.forEach((item: string) => {
        const key: string = item.split('=')[0]
        const val: string = item.split('=')[1]
        res[key] = val
      })
      return res
    }
    return null
  }

  public static setMenu (list: any[], parentId: string[] = []) {
    list.forEach((item: any) => {
      item.parent_id = []
      if (parentId && parentId.length > 0) {
        item.parent_id = [...parentId]
      }
      if (item.children && item.children.length > 0) {
        this.setMenu(item.children, [...item.parent_id, item.id])
      }
    })
  }
}
