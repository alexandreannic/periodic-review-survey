import {AppConfig} from '../../conf/AppConfig'
import {initializeApp} from 'firebase/app'
import * as fb from 'firebase/database'
import {FormAnswer} from '../../page/Form/Form'

export class FirebaseDb {
  constructor(
    private conf: AppConfig
  ) {

  }

  readonly app = initializeApp(this.conf.firebase)

  readonly db = fb.getDatabase(this.app)

  readonly save = async (answers: FormAnswer) => {
    await fb.push(fb.ref(this.db, 'answers'), answers)
  }
  
  readonly get = (cb: (answers: Record<string, FormAnswer>) => void) => {
    const ref = fb.ref(this.db, 'answers')
    fb.onValue(ref, (snapshot) => {
      const data = snapshot.val()
      console.log(data, snapshot)
      cb(data ?? {})
    })
  }
}
