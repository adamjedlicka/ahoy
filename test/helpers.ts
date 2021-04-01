import execa from 'execa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

export const get = async (route, { token = null } = {}) => {
  const request = supertest(BASE_URL).get(route)

  if (token) {
    request.set('Authorization', `Bearer ${token}`)
  }

  return await request
}

export const post = async (route, body, { token = null } = {}) => {
  const request = supertest(BASE_URL).post(route).send(body)

  if (token) {
    request.set('Authorization', `Bearer ${token}`)
  }

  return await request
}

export const login = async ({ username, password }) => {
  const { body } = await supertest(BASE_URL).post('/login').send({
    username,
    password,
  })

  return body.token
}

export const runMigrations = async () => {
  await execa.node('ace', ['migration:rollback'])
  await execa.node('ace', ['migration:run'])
}
