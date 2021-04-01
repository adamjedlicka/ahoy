import User from 'App/Models/User'
import test from 'japa'
import { login, get, post, runMigrations } from './helpers'

test.group('Message', (group) => {
  let token

  const text = 'text'

  group.before(async () => {
    await runMigrations()

    const username = 'username'
    const password = 'password'

    await User.create({
      username,
      password,
      name: 'name',
    })

    token = await login({ username, password })
  })

  test('message can be created', async (assert) => {
    const { ok } = await post('/messages', { text }, { token })

    assert.isTrue(ok)
  })

  test('messages can be retrieved', async (assert) => {
    const { body } = await get('/messages', { token })

    assert.isArray(body.messages)
    assert.equal(body.messages[0].text, text)
  })
})
