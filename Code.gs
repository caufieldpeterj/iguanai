// IguanAI — Contact Form Handler
// Google Apps Script: paste this into script.google.com, then follow APPS-SCRIPT-SETUP.md

var NOTIFY_EMAIL = 'info@iguanai.us';

// ---------------------------------------------------------------------------
// Entry point — handles POST from the contact form
// ---------------------------------------------------------------------------
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Honeypot backup check (client-side already blocks, this is belt-and-suspenders)
    if (data.website) return respond(true);

    var name    = data.name    || '(no name)';
    var company = data.company || '';
    var email   = data.email   || '';
    var message = data.message || '';

    // Append to the "Leads" sheet (auto-creates columns on first use)
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Leads') || ss.getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Company', 'Email', 'Message']);
    }

    sheet.appendRow([new Date(), name, company, email, message]);

    // Email notification
    MailApp.sendEmail({
      to:      NOTIFY_EMAIL,
      replyTo: email,
      subject: 'IguanAI inquiry — ' + name + (company ? ' @ ' + company : ''),
      body:    'Name:    ' + name                  + '\n' +
               'Company: ' + (company || 'N/A')    + '\n' +
               'Email:   ' + email                 + '\n\n' +
               'Message:\n' + message              + '\n\n' +
               '---\nSubmitted: ' + new Date()
    });

    return respond(true);

  } catch (err) {
    return respond(false, err.message);
  }
}

function respond(ok, errMsg) {
  var payload = ok ? { ok: true } : { ok: false, error: errMsg };
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
