import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

export const post = async (route, body) => {
  const response = await supertest(BASE_URL).post(route).send(body)

  return response
}
