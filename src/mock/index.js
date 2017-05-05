import axios from 'axios'
import Mock from 'mockjs'
import MockAdapter from 'axios-mock-adapter'

Mock.setup({
  timeout:4000
})
const adapter = new MockAdapter(axios)

// 各种mock数据import
import userMock from './userMock'
import menuMock from './menuMock'

adapter.onPost('/v1/login').reply(userMock.login)
adapter.onGet(/\/v1\/geInfo/).reply(userMock.getInfo)
adapter.onGet(/\/v1\/users/).reply(userMock.getUsers)

adapter.onGet(/\/getMenus/).reply(menuMock.getMenus)


export default adapter