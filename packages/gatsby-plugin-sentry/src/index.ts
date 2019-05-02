import * as Sentry from '@sentry/browser';

export function trackException(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function(...args: any[]) {
    try {
      return await originalMethod.call(this, ...args);
    } catch (err) {
      Sentry.captureException(err);
    }
  };
}
