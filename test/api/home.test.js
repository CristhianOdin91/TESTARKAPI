import request from 'supertest'

import { API_CONSTANTS } from '../../src/config'

const { URL_BASE, ENDPOINTS } = API_CONSTANTS.ARK

let app, server

describe(':::Endpoint de Inicio:::', () => {
  beforeEach(async () => {
    ({ app, server } = await import('../../src/server'))
  })

  it('Debería responder con mensaje de API REST activa', async () => {
    const res = await request(app).get(`${URL_BASE}${ENDPOINTS.HOME}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual('API REST activa')
  })

  afterEach(() => {
    server.close()
  })
})
