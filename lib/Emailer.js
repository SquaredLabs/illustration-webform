const nodemailer = require("nodemailer")
require("dotenv").config()
const encryptWO = require('./CryptoHandler').encryptWO

transportConfig = {
    host: process.env.SMTP_HOSTNAME,
    port: parseInt(process.env.PORT),
    tls: { rejectUnauthorized: false },
}
  
if (process.env.EMAILUSER && process.env.EMAILUSER.length > 1) {
  transportConfig.auth = {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASS
  }
}

console.log(transportConfig)

const transporter = nodemailer.createTransport(transportConfig)
transporter.verify(function(error) {
  if (error) {
    console.log(error)
  } else {
    console.log("Server is ready to take our messages")
  }
})

function urlFor(path) {
  return `${process.env.URL}/${path}`
}

function requestToHTML(data, confirmation) {
  let confirmationText = confirmation
    ? `Confirmation for Illustration Request ${data.WorkOrderNumber}`
    : `Illustration Request ${data.WorkOrderNumber}`
  return `<html>
        <h2>${confirmationText}</h4>
        <h3>Submitted information</h3>
            <p> Description: ${data.description}</p>
            <p> Name: ${data.contactName}</p>
            <p> Email: ${data.contactEmail}</p>
            <p> Phone: ${data.contactPhone}</p>
            <p> KFS: ${data.KFS == "" ? "N/A" : data.KFS}</p>
    </html>`
}

async function signatureRequestToHTML(data) {
  let woSTR = data.wo.toString()
  console.log(woSTR)
  let encryptedWO = await encryptWO(woSTR)
  return `<html>
        <h2>Your Illustration Request has been approved, and needs a signature!</h4>
        <h3><a href="${urlFor('approvalForm/' + encryptedWO)}">${ urlFor('approvalForm/' + data.wo) }</a></h3>
    </html>`
}

function signedToHTML(data) {
  return `<html>
        <h2>Illustration Request ${data.wo} has been signed for!</h4>
    </html>`
}

function sendRequestEmail(data, to, confirmation = false) {
  let text = requestToHTML(data, confirmation)
  let subject = confirmation
    ? `Confirmation for Illustration Request ${data.WorkOrderNumber}`
    : `Illustration Request ${data.WorkOrderNumber}`
  let message = {
    text: text,
    from: `SquaredLabs Illustration Services <${process.env.EMAIL}>`,
    to: to,
    subject: subject,
    html: text
  }
  //server.send(message, function (err, message) { console.log(err || 'Message Sent'); });
  transporter.sendMail(message, (error, info) => {
    if (error) {
      return console.error(error)
    }
    console.log("Message sent: %s", info.messageId)
  })
}

function sendSignedEmail(data, to) {
  let text = signedToHTML(data, confirmation)
  let subject = `Illustration Request ${data.wo} Signed!`
  let message = {
    text: text,
    from: `SquaredLabs Illustration Services <${process.env.EMAIL}>`,
    to: to,
    subject: subject,
    html: text
  }
  //server.send(message, function (err, message) { console.log(err || 'Message Sent'); });
  transporter.sendMail(message, (error, info) => {
    if (error) {
      return console.error(error)
    }
    console.log("Message sent: %s", info.messageId)
  })
}

async function sendSignatureEmail(data, to) {
  let text = await signatureRequestToHTML(data)
  let subject = `Signature needed for Illustation Request ${data.wo}`
  let message = {
    text: text,
    from: `SquaredLabs Illustration Services <${process.env.EMAIL}>`,
    to: to,
    subject: subject,
    html: text
  }
  //server.send(message, function (err, message) { console.log(err || 'Message Sent'); });
  transporter.sendMail(message, (error, info) => {
    if (error) {
      return console.error(error)
    }
    console.log("Message sent: %s", info.messageId)
  })
}

function sendRequestEmails(data) {
  try {
    sendRequestEmail(data, `${data.contactName} <${data.contactEmail}>`, true)
    sendRequestEmail(
      data,
      `User1 <${process.env.SENDTOEMAIL1}>, User2 <${process.env.SENDTOEMAIL2}>`
    )
  } catch (e) {
    console.error(e)
  }
}

async function sendSignatureEmails(data) {
  try {
    sendSignatureEmail(data, `${data.contactName} <${data.contactEmail}>`, true)
  } catch (e) {
    console.error(e)
  }
}

function sendSignedEmails(data) {
  try {
    sendSignedEmail(
      data,
      `User1 <${process.env.SENDTOEMAIL1}>, User2 <${process.env.SENDTOEMAIL2}>`
    )
    
  } catch (e) {
    console.error(e)
  }
}
async function sendEmails(data) {
  console.log(data)
  if (data.status === undefined) return sendRequestEmails(data)
  switch (data.status) {
    case 0: //This case should not exist
      sendRequestEmails(data)
      break
    case 1:
      sendSignatureEmails(data)
      break
    case 2:
      sendSignedEmails(data)
      break
    default:
      console.error(`Status is ${status.data}?`)
      break
  }
  
}
module.exports = sendEmails
