import Ably from "ably";

export function configureAbly(apiKey: string) {
  return new Ably.Realtime({ key: apiKey });
}
