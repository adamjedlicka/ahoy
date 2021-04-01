import test from 'japa'
import { login, get, post, runMigrations } from './helpers'

test.group('Message', (group) => {
  let token

  const text = 'text'

  group.before(async () => {
    await runMigrations()

    token = await login({ username: 'username', password: 'password' })
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
