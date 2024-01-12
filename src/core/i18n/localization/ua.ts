import {dateFromNow, formatDate, formatDateTime, formatDuration, formatLargeNumber, formatTime} from './en'

export const ua = {
  formatDate,
  formatTime,
  formatDateTime,
  dateFromNow,
  formatDuration,
  formatLargeNumber,
  messages: {
    area: 'Область',
    answers: 'Відповіді',
    noDataAtm: 'На даний момент немає даних',
    seeResults: 'Переглянути результати',
    select3Outcomes: 'Будь ласка, виберіть 3 результати',
    somethingWentWrong: 'Щось пішло не так',
    yes: 'Так',
    no: 'Ні',
    home: 'додому',
    previous: 'Попередній',
    next: 'Наступний',
    yourAnswers: 'Ваші відповіді',
    confirm: 'Підтвердити',
    formSubmitted: 'Відповіді успішно відправлені',
    formOutcome: {
      title: 'Які 3 результати ...',
      questions: {
        now: '... Ви вважаєте, що ми найбільше допомагаємо зараз?',
        oneYear: '... Ви вважаєте, що ми маємо найбільше допомогти через рік?',
        end: '... Ви вважаєте, що ми маємо найбільше допомогти до кінця поточної стратегії ДРК (2025 року)',
      },
      breakthrough: {
        breakthrough1: {
          title: 'Прорив 1',
          desc: 'Як і інші, люди, які постраждали від конфлікту та переміщення, повинні мати змогу шукати безпеку та заявляти про основні права',
          options: {
            bt1_outcomeArea1: {title: 'Область результату 1', desc: 'Більш безпечні спільноти мають здатність та системи для зменшення всіх форм насильства'},
            bt1_outcomeArea2: {title: 'Область результату 2', desc: 'Базові потреби людей задовольняються'},
            bt1_outcomeArea3: {title: 'Область результату 3', desc: 'Державні службовці діють з повагою, захищають та виконують права людей'},
            bt1_outcomeArea4: {title: 'Область результату 4', desc: 'Люди можуть вимагати повагу до захисту та виконання їх прав'},
            bt1_outcomeArea5: {title: 'Область результату 5', desc: 'Люди можуть ефективно використовувати системи для виконання своїх прав'},
          }
        },
        breakthrough2: {
          title: 'Прорив 2',
          desc: 'На рівних з іншими, люди, що постраждали від конфліктів та переміщень, повинні мати можливість розвивати самодостатність',
          options: {
            bt2_outcomeArea5: {title: 'Область результату 5', desc: 'Люди можуть ефективно використовувати системи для здійснення своїх прав'},
            bt2_outcomeArea6: {title: 'Область результату 6', desc: 'Люди мають більш гідне та стійке забезпечення життя'},
            bt2_outcomeArea7: {title: 'Область результату 7', desc: 'Підвищується соціальна сплоченість у спільнотах/суспільствах'},
            bt2_outcomeArea8: {title: 'Область результату 8', desc: 'Люди можуть ефективно брати участь у справедливому та рівному громадському житті'},
            bt2_outcomeArea9: {title: 'Область результату 9', desc: 'Зменшується ризик вразливості та небезпеки природних катастроф'},
          },
        },
      }
    },
    questionArea: 'У якій області ви працюєте?',
    offices: {
      kharkiv: 'Kharkiv',
      dnipro: 'Dnipro',
      chernihiv: 'Chernihiv',
      sumy: 'Sumy',
      mykolaiv: 'Mykolaiv',
      lviv: 'Lviv',
    },
    areas: {
      north: 'Північ',
      east: 'Схід',
      south: 'Південь',
      west: 'Захід'
    }
  }
}
