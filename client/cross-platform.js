// #if process.env.TARGET_ENV === 'electron'
import { machineIdSync } from 'node-machine-id'
// #endif

const deviceId = () => {
  if (process.env.TARGET_ENV) {
    // #if process.env.TARGET_ENV !== 'mobile'
    // #if process.env.TARGET_ENV !== 'electron'
    return 'browser'
    // #endif
    // #endif

    // #if process.env.TARGET_ENV === 'mobile'
    return device.uuid
    // #endif
  } else {
    return machineIdSync()
  }
}

export { deviceId }
