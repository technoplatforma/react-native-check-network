import { NativeModules } from 'react-native';

type CheckNetworkType = {
  multiply(a: number, b: number): Promise<number>;
};

const { CheckNetwork } = NativeModules;

export default CheckNetwork as CheckNetworkType;
