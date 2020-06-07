import { Client, MessageReaction, PartialUser, User, Message } from 'discord.js'
import nconf from 'nconf'

nconf.argv().env().file({ file: 'config.json' })
const token: string = nconf.get('DCC_TOKEN') || nconf.get('token')

if (!token) {
  throw Error('Missing required configuration: token')
}

console.log('Creating client')
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION'] });

client.on('ready', () => {
  console.log('Client ready')
})

client.on('message', (message: Message) => {
  console.log(
    'Message',
    message.guild?.toString(),
    message.channel.toString(),
    message.author.toString(),
    message.content.toString()
  )
})

client.on('messageReactionAdd', async (reaction: MessageReaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch()
    } catch (err) {
      console.log('Failed fetching partial reaction', err)
      return;
    }
  }
  if (user.partial) {
    try {
      await user.fetch()
    } catch (err) {
      console.log('Failed fetching partial user', err)
      return;
    }
  }
  console.log(
    'Reaction',
    reaction.message.guild?.toString(),
    reaction.message.channel.toString(),
    user.toString(), reaction.emoji.toString()
  )
})

client.login(token)
  .catch(reason => {
    console.log('Failed logging in', reason)
  })
