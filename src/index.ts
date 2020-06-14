import { Client, Message } from 'discord.js'
import nconf from 'nconf'
import ContentDiscoverer from './ContentDiscoverer'
import { GuildConfig } from './types'

nconf.argv().env().file({ file: 'config.json' })
const token: string = nconf.get('DCC_TOKEN') || nconf.get('token')
const guilds: Array<GuildConfig> = nconf.get('guilds')
if (!token) {
  throw Error('Missing required configuration: token')
}

console.log('Setting up client...')
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION'] });

client.on('ready', () => {
  console.log('Client ready...')
})

const contentDiscoverer = new ContentDiscoverer({ client, guilds })
contentDiscoverer.on('contentDiscover', (message: Message) => console.log(`Discovered content: ${message.content}`))

client.login(token)
  .catch(reason => {
    console.log('Failed to login...', reason)
  })
