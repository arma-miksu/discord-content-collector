import GuildFilterer from './GuildFilterer'
import { expect } from 'chai'
import { mock, instance, when } from 'ts-mockito'
import { Guild } from 'discord.js'

describe('GuildFilterer', () => {
  it('matches with given guilds', () => {
    const testSet = [
      {
        filterGuildName: 'lorem',
        testGuild: 'lorem',
        result: true
      },
      {
        filterGuildName: 'lorem',
        testGuild: 'ipsum',
        result: false
      },
      {
        filterGuildName: 'ipsum',
        testGuild: 'lorem',
        result: false
      },
      {
        filterGuildName: '😀',
        testGuild: '😀',
        result: true
      },
      {
        filterGuildName: '😀',
        testGuild: '😓',
        result: false
      },
      {
        filterGuildName: 'Lorem Ipsum Dolor Sit Amnet',
        testGuild: 'Lorem Ipsum Dolor Sit Amnet',
        result: true
      }
    ];
    for (let { filterGuildName, testGuild, result } of testSet) {
      const guildFilterer = new GuildFilterer({ guildName: filterGuildName })
      const mockedGuild:Guild = mock(Guild)
      when(mockedGuild.name).thenReturn(testGuild)
      const guild:Guild = instance(mockedGuild)
      expect(guildFilterer.match(guild)).to.be.equal(result, `${filterGuildName} - ${testGuild} = ${result}`)
    }
  })
})
