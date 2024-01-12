import {AppConfig} from '../../conf/AppConfig'
import {initializeApp} from 'firebase/app'
import * as fb from 'firebase/database'
import {FormAnswer} from '../../page/Form/Form'
import {Enum} from '@alexandreannic/ts-utils'

export class FirebaseDb {
  constructor(
    private conf: AppConfig
  ) {

  }

  readonly app = initializeApp(this.conf.firebase)

  readonly db = fb.getDatabase(this.app)

  readonly save = async (answers: FormAnswer) => {
    answers.savedAt = new Date().toISOString() as any
    await fb.push(fb.ref(this.db, 'answers'), answers)
  }

  readonly get = (cb: (answers: Record<string, FormAnswer>) => void) => {
    const ref = fb.ref(this.db, 'answers')
    fb.onValue(ref, (snapshot) => {
      const data: Record<string, FormAnswer> = snapshot.val()
      new Enum(data).transform((k, v) => [k, {...v, savedAt: new Date(v.savedAt as any)}])
      cb(data ?? {})
    })
  }
}
