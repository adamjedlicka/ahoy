import test from 'japa'
import { post, runMigrations } from './helpers'

test.group('Auth', (group) => {
  const email = 'test@email.cz'
  const password = 'password'

  group.before(async () => {
    await runMigrations()
  })

  test('user can register', async (assert) => {
    const { body } = await post('/register', { email, password, password_confirmation: password })

    assert.equal(body.email, email)
  })

  test('registered user can log in', async (assert) => {
    const { body } = await post('/login', { email, password })

    assert.isString(body.token)
  })
})
