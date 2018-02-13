// #if process.env.TARGET_ENV === 'electron'
import { machineId } from 'node-machine-id'
// #endif

const deviceId = async function deviceID () {
  // #if process.env.TARGET_ENV !== 'mobile'
  // #if process.env.TARGET_ENV !== 'electron'
  return 'browser'
  // #endif
  // #endif

  // #if process.env.TARGET_ENV === 'mobile'
  return device.uuid
  // #endif
  
  // #if process.env.TARGET_ENV !== 'electron'
  return await machineId()
  // #endif
}

export { deviceId }