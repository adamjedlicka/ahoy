import Room from 'App/Models/Room'
import User from 'App/Models/User'
import test from 'japa'
import { runMigrations } from './helpers'

test.group('Room', (group) => {
  group.before(async () => {
    await runMigrations()
  })

  test('allows creating new rooms', async (assert) => {
    const user = await User.create({
      email: 'email',
      password: 'password',
    })

    assert.equal((await User.all()).length, 1)

    const room = await Room.create({
      name: 'name',
      ownerId: user.id,
    })

    assert.equal((await Room.all()).length, 1)

    assert.equal(await (await user.related('rooms').query()).length, 1)
    assert.isNotNull(room.related('owner').query())
  })
})
