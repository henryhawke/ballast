import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import moment from 'moment'
import nodemailer from 'nodemailer'

const gmail = functions.config().gmail

const mailTransport = nodemailer.createTransport(
  `smtps://${gmail.email}:${gmail.password}@smtp.gmail.com`
)

export default functions.auth.user().onCreate(async (userRecord, context) => {
  const { email, uid, creationTime: created } = userRecord || {}
  const creationTime = moment(created)
  const year = creationTime.format('YYYY')
  const month = creationTime.format('MM')
  const day = creationTime.format('DD')

  const user = await admin.auth().getUser(uid)
  const { providerData = [], displayName } = user
  const { providerId: id } = providerData[0] || {
    providerId: email ? 'password' : 'phone',
  }
  const providerId = id.replace('.com', '')

  if (providerId) {
    await admin
      .database()
      .ref(`/provider_count/${providerId}`)
      .transaction((current) => (current || 0) + 1)
  }

  await admin
    .database()
    .ref(`/user_registrations_per_day/${year}/${month}/${day}`)
    .transaction((current) => (current || 0) + 1)

  await admin
    .database()
    .ref(`/user_registrations_per_month/${year}/${month}`)
    .transaction((current) => (current || 0) + 1)

  await admin
    .database()
    .ref(`/users_count`)
    .transaction((current) => (current || 0) + 1)

  await admin.database().ref(`user_chats/${uid}/public_chat`).update({
    displayName: 'Public Chat',
    lastMessage: 'Group chat',
    path: `group_chat_messages/public_chat`,
  })

  if (email) {
    const mailOptions = {
      from: `"" <${gmail.email}>`,
      to: email,
      subject: `Welcome to IFAI Ballasting Tool!`,
      text: `
Hi ${displayName}!, 
Welcome to the IFAI Ballast Tool!
`,
    }

    await mailTransport.sendMail(mailOptions)
  }

  return
})
