type EventHandler<T> = (event: T) => void;

/**
 * Реализация PubSub для работы с событиями
 * @param TEventTypes - типы событий
 * @param TEventPayloads - типы payload для событий
 */
export class Gb1bPubSub<TEventTypes extends string, TEventPayloads extends Record<TEventTypes, any>> {
  private handlers: { [K in TEventTypes]?: EventHandler<TEventPayloads[K]>[] } = {};

  subscribe<K extends TEventTypes>(event: K, handler: EventHandler<TEventPayloads[K]>): void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event]!.push(handler);
  }

  unsubscribe<K extends TEventTypes>(event: K, handler: EventHandler<TEventPayloads[K]>): void {
    this.handlers[event] = (this.handlers[event] || []).filter(h => h !== handler);
  }

  publish<K extends TEventTypes>(event: K, payload: TEventPayloads[K]): void {
    (this.handlers[event] || []).forEach(handler => handler(payload));
  }
}