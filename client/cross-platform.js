// #if process.env.TARGET_ENV === 'electron'
import { machineIdSync } from 'node-machine-id'
// #endif

const deviceId = async function deviceID () {
  // #if process.env.TARGET_ENV !== 'mobile'
  // #if process.env.TARGET_ENV !== 'electron'
  return () => { return 'browser' }
  // #endif
  // #endif

  // #if process.env.TARGET_ENV === 'mobile'
  return () => { return device.uuid }
  // #endif
  
  // #if process.env.TARGET_ENV !== 'electron'
  return 'test'
  return machineIdSync()
  // #endif
}

export { deviceId }