const nodemailer = require("nodemailer")
require("dotenv").config()

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

function dataToHTML(data, confirmation) {
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

function sendWOEmail(data, to, confirmation = false) {
  let text = dataToHTML(data, confirmation)
  let subject = confirmation
    ? `Confirmation for Work Order ${data.WorkOrderNumber}`
    : `Work Order ${data.WorkOrderNumber}`
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
function sendEmails(data) {
  try {
    sendWOEmail(data, `${data.contactName} <${data.contactEmail}>`, true)
    sendWOEmail(
      data,
      `User1 <${process.env.SENDTOEMAIL1}>, User2 <${process.env.SENDTOEMAIL2}>`
    )
  } catch (e) {
    console.error(e)
  }
}
module.exports = sendEmails
