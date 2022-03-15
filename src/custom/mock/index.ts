// @ts-nocheck
import mock from 'better-mock'
import mockData from './data/common'

mock.mock(/\/mock-data\/getSendMsg/, mockData.getSendMsg)
mock.mock(/\/mock-data\/getUserMenu/, mockData.getUserMenu)
mock.mock(/\/mock-data\/getUserInfo/, mockData.getUserInfo)

export default mockData
