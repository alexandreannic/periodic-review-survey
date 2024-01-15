import {AppConfig} from '../../conf/AppConfig'
import {initializeApp} from 'firebase/app'
import * as fb from 'firebase/database'
import {FormAnswer} from '../../page/Form/Form'
import {Enum, fnSwitch} from '@alexandreannic/ts-utils'

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
      const mapped = new Enum(data)
        .transform((k, v) => {
          const m: FormAnswer = {
            ...v,
            office: v.office ?? fnSwitch(v.area!, {
              south: 'mykolaiv',
              east: 'dnipro',
              west: 'lviv',
              north: 'chernihiv',
            }),
            savedAt: new Date(v.savedAt as any)
          }
          return [k, m]
        })
        .get()
      cb(mapped ?? {})
    })
  }
}
