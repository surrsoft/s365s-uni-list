
/**
 * !psb-pubsub!
 * Реализация PubSub для работы с событиями
 * @param T1 - !psb-ev-id!s
 * @param T2 - !psb-payload!s
 */
export class PsbPubSub<T1 extends string, T2 extends Record<T1, any>> {
  /** !psb-h-obj! */
  private handlersObj: { [K in T1]?: PsbHandlerType<T2[K]>[] } = {};

  /** 
   * !psb-s-method! 
   * Подписка на событие
   * @param evId - !psb-ev-id!
   * @param handler - !psb-handler!
  */
  subscribe<K extends T1>(evId: K, handler: PsbHandlerType<T2[K]>): void {
    if (!this.handlersObj[evId]) {
      this.handlersObj[evId] = [];
    }
    this.handlersObj[evId]!.push(handler);
  }

  /** 
   * !psb-us-method! 
   * Отписка от события
   * @param evId - !psb-ev-id!
   * @param handler - !psb-handler!
  */
  unsubscribe<K extends T1>(evId: K, handler: PsbHandlerType<T2[K]>): void {
    this.handlersObj[evId] = (this.handlersObj[evId] || []).filter(h => h !== handler);
  }

  /** 
   * !psb-p-method! 
   * Публикация события
   * @param evId - !psb-ev-id!
   * @param payload - !psb-payload!
  */
  async publish<K extends T1>(evId: K, payload: T2[K]): Promise<void> {
    const handlers = this.handlersObj[evId] || [];
    await Promise.all(handlers.map(handler => Promise.resolve().then(() => handler(payload))));
  }
}

/** !psb-handler! */
export type PsbHandlerType<T> = (event: T) => void | Promise<void>;

/** !psb-ev-id! */
export type PsbEventId = string;