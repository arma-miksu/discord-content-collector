import { Client } from "discord.js";

interface ContentDiscovererOptions {
  client: Client
}

export default class ContentDiscoverer {
  client: Client
  registeredEventListeners: Map<string, Array<Function>> = new Map()

  /**
   * Constructs ContentDiscoverer with given options.
   * @param opts 
   */
  constructor(opts: ContentDiscovererOptions) {
    this.client = opts.client
  }

  /**
   * Registers an event listener.
   * @param eventName Name of the event that will be subscribed to.
   * @param callback Callback function that is being called on event invokation.
   */
  on(eventName: string, callback: Function): void {
    const callbacks = this.registeredEventListeners.get(eventName) || []
    callbacks.push(callback)
    this.registeredEventListeners.set(eventName, callbacks)
  }

  /**
   * Trigger an event so listeners can react on it.
   * @param eventName Name of the event that is triggered.
   * @param args Arguments given for events callbacks.
   */
  trigger(eventName: string, args: any[]): void {
    const callbacks: Function[] = this.registeredEventListeners.get(eventName) || []
    callbacks.forEach((callback: Function) => callback(...args))
  }
}
