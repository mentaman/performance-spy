export class Observer {
    subscribers: any[]
    constructor() {
        this.subscribers = [];
    }
    subscribe(fn: any) {
        this.subscribers.push(fn);
    }

    notify(...args: any) {
        this.subscribers.forEach(subscriber => {
            subscriber(...args)
        })
    }
}

export const callbacks : {[key: string]: any} = {
    selector: new Observer(),
}

export const subscribeAll = (callbacksToSubscribe = {}) => {
    Object.entries(callbacksToSubscribe).forEach(([name, fn]) => {
        callbacks[name].subscribe(fn)
    })
}
