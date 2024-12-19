import { type Dispatch, useCallback, useState } from 'react';

interface AppEvent<PayloadType = unknown> extends Event {
  detail: PayloadType;
}

export type AddListener<PayloadType = unknown> = (
  eventName: string,
  callback: Dispatch<PayloadType> | VoidFunction,
) => () => void;

export const useEvent = <PayloadType = unknown>() => {
  const [events, setEvents] = useState<Record<string, Array<EventListener>>>(
    {},
  );

  const dispatch = useCallback(
    (eventName: string, detail?: PayloadType) => {
      const event = new CustomEvent(eventName, { detail });
      events[eventName].forEach((fn) => fn(event));
    },
    [events],
  );

  const addListener = useCallback<AddListener<PayloadType>>(
    (eventName, callback) => {
      const listener: EventListener = ((event: AppEvent<PayloadType>) => {
        callback(event.detail); // Use `event.detail` for custom payloads
      }) as EventListener;

      setEvents((prev) => ({
        ...prev,
        [eventName]: (prev[eventName] ?? []).concat(listener),
      }));

      return () => {
        setEvents((prev) => ({
          ...prev,
          [eventName]: prev[eventName].filter((fn) => fn !== listener) ?? [],
        }));
      };
    },
    [],
  );

  // Return a function to dispatch the event
  return { dispatch, addListener };
};
