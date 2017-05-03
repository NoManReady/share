import fetch from '@/utils/fetch'

export function getMenus(){
  return fetch({
    url:'/v1/getMenus'
  })
}