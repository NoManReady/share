import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

// 各种mock数据import
import userMock from './userMock'
import menuMock from './menuMock'

mock.onPost('/v1/login').reply(userMock.login)
mock.onGet('/v1/geInfo').reply(userMock.getInfo)
mock.onGet('/v1/users').reply(userMock.getUsers)

mock.onGet('/v1/getMenus').reply(menuMock.getMenus)


export default mock