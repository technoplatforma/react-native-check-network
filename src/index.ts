import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native'

export interface Status {
  isReachable: boolean
}

interface CheckNetworkType {
  isReachable(): Promise<boolean>
  startListen(listener: (isReachable: Status) => void): void
  stopListen(): void
}

//const {CheckNetwork} = NativeModules

class CheckNetwork implements CheckNetworkType {
  private eventEmitter = new NativeEventEmitter(NativeModules.CheckNetwork)
  private events: Array<EmitterSubscription> = []

  isReachable = (): Promise<boolean> => {
    return NativeModules.CheckNetwork.isReachable()
  }

  onNetworkChange = () => {}

  startListen = (listener: (isReachable: Status) => void) => {
    this.events.push(this.eventEmitter.addListener('onNetworkChange', listener))

    NativeModules.CheckNetwork.startListen()
  }

  stopListen = () => {
    this.events.forEach((e) => e.remove())
    NativeModules.CheckNetwork.stopListen()
  }
}

export const checkNetwork = new CheckNetwork()
