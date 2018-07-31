const nodemailer = require("nodemailer")
require("dotenv").config()
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOSTNAME,
  port: parseInt(process.env.PORT),
  tls: { rejectUnauthorized: false }
})
transporter.verify(function(error) {
  if (error) {
    console.log(error)
  } else {
    console.log("Server is ready to take our messages")
  }
})

// send mail with defined transport object

const opts = {
  user: process.env.EMAIL,
  port: parseInt(process.env.PORT),
  host: process.env.SMTP_HOSTNAME
}
console.log(opts)
//const server = email.server.connect(opts);

function dataToHTML(data, confirmation) {
  let account = data.account
  let request = data.request
  let contact = data.contact
  let confirmationText = confirmation
    ? `Confirmation for Work order ${data.WorkOrderNumber}`
    : `Work order ${data.WorkOrderNumber}`
  return `<html>
        <h2>${confirmationText}</h4>
        <h3>Account Information</h3>
            <p> KFS Number: ${account.KFS}</p>
            <p> Name: ${account.Name}</p>
            <p> Department: ${account.Department}</p>
            <p> Address: ${account.Address}</p>
            <p> Phone: ${account.Phone}</p>
            <p> Email: ${account.Email}</p>
        <h3>Request Information</h3>
            <p> Type: ${request.Type}</p>
            <p> CostEstimate: ${request.CostEstimate}</p>
            <p> TFSUnit: ${request.TFSUnit}</p>
            <p> Description: ${request.Description}</p>
            <p> MakeModel: ${request.MakeModel}</p>
            <p> Location: ${request.Location}</p>
        <h3>Contact Information</h3>
            <p> Name: ${contact.Name}</p>
            <p> Phone: ${contact.Phone}</p>
            <p> Email: ${contact.Email}</p>
    </html>`
}

function sendWOEmail(data, to, confirmation = false) {
  let text = dataToHTML(data, confirmation)
  let subject = confirmation
    ? `Confirmation for Work Order ${data.WorkOrderNumber}`
    : `Work Order ${data.WorkOrderNumber}`
  let message = {
    text: text,
    from: `CORE Tech Services <${process.env.EMAIL}>`,
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
    let confirmationTo = data.contact
    sendWOEmail(data, `${confirmationTo.Name} <${confirmationTo.Email}>`, true)
    sendWOEmail(
      data,
      `User1 <${process.env.SENDTOEMAIL1}>, User2 <${process.env.SENDTOEMAIL2}>`
    )
  } catch (e) {
    console.error(e)
  }
}
module.exports = sendEmails
