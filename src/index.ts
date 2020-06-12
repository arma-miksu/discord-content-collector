import { Client, MessageReaction, User, PartialUser } from 'discord.js'
import nconf from 'nconf'
import { GuildConfig } from './types'
import { filterMatcher, guildConfigMatcher } from './utils'

nconf.argv().env().file({ file: 'config.json' })
const token: string = nconf.get('DCC_TOKEN') || nconf.get('token')
const guildConfigs: Array<GuildConfig> = nconf.get('guilds')
if (!token) {
  throw Error('Missing required configuration: token')
}

console.log('Setting up client...')
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION'] });

client.on('ready', () => {
  console.log('Client ready...')
})

client.on('messageReactionAdd', async (reaction: MessageReaction, user: PartialUser | User) => {
  if (!reaction.message.guild) return

  if (reaction.partial) {
    try {
      await reaction.fetch()
    } catch (err) {
      console.error('Failed fetching partial reaction', err)
      return;
    }
  }

  const guildConfig = guildConfigMatcher(guildConfigs, reaction.message.guild)
  if (!guildConfig) return;

  const filterMatch = await filterMatcher(guildConfig.filter, reaction, user)
  if (!filterMatch) return;

  // TODO: This is the message that should be collected
  console.log(reaction.message.content)
})

client.login(token)
  .catch(reason => {
    console.log('Failed to login...', reason)
  })
