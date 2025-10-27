import { chapters } from './chapters'
import { nav } from './chapters/nav'
import config from './config';

import {Course} from '@nss-workshops/nss-core'

function App() {
  return (
    <Course chapters={chapters} config={config} nav={nav} />
  )
}

export default App
