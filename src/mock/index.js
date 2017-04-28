import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

// 各种mock数据import
import userMock from './userMock'

mock.onPost('/v1/login').reply(userMock.login)
mock.onGet('/v1/info').reply(userMock.getInfo)


export default mock