import test from 'japa'
import { post, runMigrations } from './helpers'

test.group('Auth', (group) => {
  const username = 'username'
  const password = 'password'
  const name = 'name'

  group.before(async () => {
    await runMigrations()
  })

  test('user can register', async (assert) => {
    const { ok, body } = await post('/register', { username, password, password_confirmation: password, name })

    assert.isTrue(ok)
    assert.equal(body.username, username)
  })

  test('registered user can log in', async (assert) => {
    const { ok, body } = await post('/login', { username, password })

    assert.isTrue(ok)
    assert.isString(body.token)
  })
})
