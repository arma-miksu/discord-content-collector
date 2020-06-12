import { Client } from 'discord.js'
import nconf from 'nconf'

nconf.argv().env().file({ file: 'config.json' })
const token: string = nconf.get('DCC_TOKEN') || nconf.get('token')

if (!token) {
  throw Error('Missing required configuration: token')
}

console.log('Setting up client...')
const client = new Client();

client.on('ready', () => {
  console.log('Client ready...')
})

client.login(token)
  .catch(reason => {
    console.log('Failed to login...', reason)
  })
