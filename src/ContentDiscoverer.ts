import { Client } from "discord.js";

interface ContentDiscovererOptions {
  client: Client
}

export default class ContentDiscoverer {
  client: Client
  registeredEventListeners: Map<string, Array<Function>> = new Map()
  constructor(opts: ContentDiscovererOptions) {
    this.client = opts.client
  }
  on(eventName: string, callback: Function): void {
    const callbacks = this.registeredEventListeners.get(eventName) || []
    callbacks.push(callback)
    this.registeredEventListeners.set(eventName, callbacks)
  }
  trigger(eventName: string, args: any[]): void {
    const callbacks: Function[] = this.registeredEventListeners.get(eventName) || []
    callbacks.forEach((callback: Function) => callback(...args))
  }
}
