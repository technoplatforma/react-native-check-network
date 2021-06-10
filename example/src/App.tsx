import * as React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {checkNetwork} from 'react-native-check-network'

export default function App() {
  const [result, setResult] = React.useState<boolean>(false)

  React.useEffect(() => {
    checkNetwork.isReachable().then((e) => {
      console.log('============', e)
    })

    checkNetwork.startListen((status) => {
      console.log('listen', status)
      setResult(status.isReachable)
    })

    return () => checkNetwork.stopListen()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Result: {`${result}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
