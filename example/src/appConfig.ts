import { VAppConfiguration } from "./api_dev";

// this is the app configuration json containing all of the metadata
const appConfig = {
  name: 'app-data-client-example',
  host: `http://192.168.1.72:3005/`,
  version: { major: 1, minor: 0, revision: 0 }
  /**
   * // TODO [ ] Add EntityTypes with fields and modules
   */
}

export default appConfig as VAppConfiguration;