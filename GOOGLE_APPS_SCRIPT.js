// Google Apps Script - Web App Handler
// Copy this ENTIRE code into your Google Apps Script editor
// Then deploy as Web App with "Execute as: Me" and "Who has access: Anyone"

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 'message': 'GET request received' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // Parse incoming form data (sent as FormData, not JSON)
    const data = e.parameter;
    
    // Get active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Prepare row data
    const timestamp = new Date();
    const rowData = [
      timestamp,                // Timestamp
      data.name || '',          // Parent Name
      data.email || '',         // Email
      data.phone || '',         // Phone
      data.numChildren || '',   // Number of Children
      data.program || '',       // Program
      data.date || '',          // Selected Date
      data.message || '',       // Message/Notes
      'Pending',                // Status
      ''                        // Admin Notes
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    // Send confirmation email to parent
    try {
      MailApp.sendEmail({
        to: data.email,
        subject: 'Booking Confirmation - Latitude Summer Camp',
        htmlBody: `
          <h2>Thank you for your booking request!</h2>
          <p>Hi ${data.name},</p>
          <p>We've received your booking request for <strong>${data.program}</strong> on <strong>${data.date}</strong>.</p>
          <p><strong>Number of Children:</strong> ${data.numChildren}</p>
          <p>We'll review your booking and get back to you soon!</p>
          <br>
          <p>Best regards,<br>Latitude Summer Camp Team</p>
        `
      });
    } catch (emailError) {
      Logger.log('Email error: ' + emailError);
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'success', 
        'message': 'Booking received successfully!' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    Logger.log('Error: ' + error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'message': error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
