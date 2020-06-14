import RoleFilterer from './RoleFilterer'
import { expect } from 'chai'
import { mock, instance, when } from 'ts-mockito'
import { Role } from 'discord.js'

describe('RoleFilterer', () => {
  it('matches with given roles', () => {
    const testSet = [
      {
        filterRoles: ['lorem', 'ipsum'],
        testRole: 'lorem',
        result: true
      },
      {
        filterRoles: ['lorem', 'sit', 'amnet'],
        testRole: 'ipsum',
        result: false
      },
      {
        filterRoles: ['ipsum', 'dolor', 'sit'],
        testRole: 'lorem',
        result: false
      },
      {
        filterRoles: ['lorem', '😀', 'ipsum'],
        testRole: '😀',
        result: true
      },
      {
        filterRoles: ['lorem', '😀', 'ipsum', 'dolor', 'sit'],
        testRole: '😓',
        result: false
      },
      {
        filterRoles: ['Lorem Ipsum Dolor Sit Amnet'],
        testRole: 'Lorem Ipsum Dolor Sit Amnet',
        result: true
      },
      {
        filterRoles: [],
        testRole: 'moderators',
        result: false
      }
    ];
    for (let { filterRoles, testRole, result } of testSet) {
      const roleFilterer = new RoleFilterer({ roles: filterRoles })
      const mockedRole: Role = mock(Role)
      when(mockedRole.name).thenReturn(testRole)
      const role: Role = instance(mockedRole)
      expect(roleFilterer.match(role)).to.be.equal(result, `${filterRoles.join(',')} - ${testRole} = ${result}`)
    }
  })
})
