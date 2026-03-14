# 📊 Google Sheets Backend Setup Guide for Latitude

> **Complete step-by-step guide to connect your contact forms to Google Sheets**  

---

## ✅ **YOUR PROGRESS:**

### **COMPLETED (Steps 1-4):** ✅
- ✅ Created Google Sheet
- ✅ Set up columns  
- ✅ Added Apps Script code
- ✅ Deployed as Web App
- ✅ Got deployment URL

### **NEXT STEPS (Do now):** ⚡
- 🔵 **Step 5:** Insert URL into contact.html (5 mins)
- 🧪 **Step 6:** Test the booking form (5 mins)
- 📊 **Step 7:** Learn to manage submissions

**Your Deployment URL:**
```
https://script.google.com/macros/s/AKfycbwSR8Z3QH7lyuw1MKJgfqFw0W0uO1xYZWvRNmPNlH_Xw6EMCOoRzpgWMJCRVIMveMbf/exec
```

**📍 You are here:** Ready to connect the form!

---

## 📋 What You'll Have When Done

By the end of this guide, you'll have:
- ✅ Google Sheet collecting all form submissions automatically
- ✅ Email notifications sent to you for new submissions
- ✅ Email confirmations sent to parents/customers
- ✅ All data organized in one place

**⏱️ Time Required:** 20-30 minutes  
**💰 Cost:** $0 (completely free with Google account)

---

## 🎯 Step 1: Create Your Google Sheet

### 1.1 Open Google Sheets
1. Go to [https://sheets.google.com](https://sheets.google.com)
2. Make sure you're logged into your Google account
3. Click the **+ Blank** button (big colorful plus icon)

### 1.2 Name Your Spreadsheet
1. Click on "Untitled spreadsheet" at the top
2. Rename it to: **Latitude Contact Forms**
3. Press Enter to save

✅ **Checkpoint:** You should now have a blank Google Sheet open

---

## 📝 Step 2: Set Up Your Sheet Columns

### 2.1 Add Column Headers
In **Row 1**, type these headers (one in each cell, starting from A1):

| Column | Header Name | Description |
|--------|-------------|-------------|
| **A** | Timestamp | When the form was submitted |
| **B** | Name | Parent/Guardian name |
| **C** | Email | Parent's email address |
| **D** | Phone | Parent's phone number |
| **E** | Num Children | Number of children |
| **F** | Program | Program they selected |
| **G** | Program Date | Date they selected (if applicable) |
| **H** | Message | Their custom message |
| **I** | Special Requirements | Allergies, medical conditions, etc. |
| **J** | Source | How they heard about you |
| **K** | Status | For tracking (New/Contacted/Booked) |

### 2.2 Format the Headers (Optional but Nice)
1. Select Row 1 (click on the "1" on the left)
2. Click the **Bold** button (or press Ctrl+B / Cmd+B)
3. Click the **Fill color** button → Choose a light color (like light blue)
4. Click **Text color** → Choose dark text

✅ **Checkpoint:** Your sheet should have 11 columns (A-K) with headers in Row 1

---

## 🔧 Step 3: Open Apps Script Editor

### 3.1 Access Apps Script
1. In your Google Sheet, click **Extensions** in the top menu
2. Click **Apps Script** in the dropdown
3. A new tab will open with the Apps Script editor

### 3.2 Prepare the Editor
1. You'll see some default code like `function myFunction() { }`
2. **Delete ALL existing code** (select all with Ctrl+A / Cmd+A, then Delete)
3. The editor should now be completely empty

✅ **Checkpoint:** You're in Apps Script editor with a blank file named "Code.gs"

---

## 💻 Step 4: Add the Backend Code

### 4.1 Copy the Complete Code
Copy **ALL** the code below and paste it into your Apps Script editor:

```javascript
// ============================================
// LATITUDE CONTACT FORMS - BACKEND SCRIPT
// ============================================
// Last Updated: February 2026
// Purpose: Handle form submissions from contact.html

// CONFIGURATION - CHANGE THESE SETTINGS
const CONFIG = {
  // Your email address to receive notifications
  ADMIN_EMAIL: "your-email@example.com", // ⚠️ CHANGE THIS!
  
  // Email settings
  SEND_ADMIN_NOTIFICATION: true,  // Get notified on new submission
  SEND_CUSTOMER_CONFIRMATION: true, // Send confirmation to customer
  
  // Sheet name (must match your sheet tab name)
  SHEET_NAME: "Sheet1" // Change if you renamed your sheet
};

// ============================================
// MAIN FUNCTION - HANDLES FORM SUBMISSIONS
// ============================================
function doPost(e) {
  try {
    // Enable CORS (allows website to send data)
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
    
    // Create timestamp
    const timestamp = new Date();
    
    // Prepare row data (matches your columns A-K)
    const rowData = [
      Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'), // Timestamp
      data.name || '',              // Name
      data.email || '',             // Email
      data.phone || '',             // Phone
      data.num_children || '',      // Number of children
      data.program || '',           // Program
      data.program_date || '',      // Program Date
      data.message || '',           // Message
      data.special_requirements || '', // Special Requirements
      data.source || '',            // Source
      'New'                         // Status (default)
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Send email notifications
    if (CONFIG.SEND_ADMIN_NOTIFICATION) {
      sendAdminNotification(data);
    }
    
    if (CONFIG.SEND_CUSTOMER_CONFIRMATION) {
      sendCustomerConfirmation(data);
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Form submitted successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(corsHeaders);
      
  } catch (error) {
    // Return error response
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle OPTIONS requests (for CORS)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({'status': 'ready'}))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// EMAIL NOTIFICATION TO ADMIN
// ============================================
function sendAdminNotification(data) {
  const subject = `🎉 New Latitude Inquiry from ${data.name}`;
  
  const body = `
    New Contact Form Submission
    ===========================
    
    📋 Contact Details:
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone}
    
    👨‍👩‍👧‍👦 Booking Details:
    Number of Children: ${data.num_children || 'Not specified'}
    Program: ${data.program || 'Not specified'}
    Preferred Date: ${data.program_date || 'Not specified'}
    
    💬 Message:
    ${data.message || 'No message provided'}
    
    ℹ️ Additional Info:
    Special Requirements: ${data.special_requirements || 'None'}
    How they found us: ${data.source || 'Not specified'}
    
    ---
    Submitted at: ${new Date()}
    
    👉 View all submissions: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
  `;
  
  MailApp.sendEmail(CONFIG.ADMIN_EMAIL, subject, body);
}

// ============================================
// CONFIRMATION EMAIL TO CUSTOMER
// ============================================
function sendCustomerConfirmation(data) {
  const subject = `Thanks for reaching out to Latitude! We'll be in touch soon`;
  
  const body = `
    Hi ${data.name}!
    
    Thank you for your interest in Latitude's outdoor programs for kids. We've received your inquiry and we're excited to help plan an amazing adventure for your child!
    
    📋 Here's what we received:
    • Number of children: ${data.num_children || 'Not specified'}
    • Program interest: ${data.program || 'Not specified'}
    ${data.program_date ? `• Preferred date: ${data.program_date}` : ''}
    
    ⏰ What happens next?
    Our team will review your inquiry and get back to you within 24 hours (usually much faster!). We'll answer any questions you have and help you book the perfect outdoor experience.
    
    📱 Need immediate assistance?
    WhatsApp us: +91 98765 43210
    Call us: +91 98765 43210
    Email: hello@latitudeoutdoors.in
    
    Best regards,
    The Latitude Team
    
    ---
    Building confidence, resilience & curiosity through nature 🌿
    www.latitudeoutdoors.in
  `;
  
  try {
    MailApp.sendEmail(data.email, subject, body);
  } catch (e) {
    Logger.log('Could not send confirmation email: ' + e.toString());
  }
}

// 📧 CONFIGURATION - Update these emails
const BUSINESS_EMAIL = "hello@latitudeoutdoors.in"; // Your business email
const BUSINESS_NAME = "Latitude Team";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Determine which form was submitted
    const isBooking = data.type === "booking";
    const targetSheet = isBooking 
      ? sheet.getSheetByName("Bookings") 
      : sheet.getSheetByName("Inquiries");
    
    if (!targetSheet) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Sheet not found"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Prepare row data based on form type
    let rowData;
    if (isBooking) {
      rowData = [
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        data.name,
        data.email,
        data.phone,
        data.numChildren,
        data.program,
        data.date,
        data.message || "N/A",
        data.spotsAvailable || "N/A",
        "New" // Status
      ];
    } else {
      rowData = [
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        data.name,
        data.email,
        data.phone,
        data.childAge || "N/A",
        data.program || "N/A",
        data.message || "N/A",
        "New" // Status
      ];
    }
    
    // Append to sheet
    targetSheet.appendRow(rowData);
    
    // Send emails
    sendParentConfirmation(data, isBooking);
    sendBusinessNotification(data, isBooking);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Submission received"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// EMAIL FUNCTIONS
// ============================================

function sendParentConfirmation(data, isBooking) {
  const subject = isBooking 
    ? "✅ Booking Request Received - Latitude" 
    : "✅ Inquiry Received - Latitude";
  
  let htmlBody;
  
  if (isBooking) {
    htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2D5A27, #3a7a30); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Booking Request Received!</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; color: #333;">Hi <strong>${data.name}</strong>,</p>
          
          <p style="font-size: 14px; color: #666;">Thank you for booking with Latitude! We're excited to have your child join us on this adventure.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2D5A27;">
            <h3 style="margin-top: 0; color: #2D5A27;">📋 Booking Summary</h3>
            <p style="margin: 8px 0;"><strong>Program:</strong> ${data.program}</p>
            <p style="margin: 8px 0;"><strong>Date:</strong> ${data.date}</p>
            <p style="margin: 8px 0;"><strong>Number of Children:</strong> ${data.numChildren}</p>
            <p style="margin: 8px 0;"><strong>Contact:</strong> ${data.phone}</p>
          </div>
          
          <div style="background: #FFF8E1; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #E8A838;">
            <p style="margin: 0; font-size: 14px; color: #666;"><strong>⏰ What's Next?</strong></p>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #666;">Our team will reach out within <strong>24 hours</strong> to confirm your spot and share payment details.</p>
          </div>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="https://wa.me/919876543210?text=Hi!%20I%20just%20submitted%20a%20booking%20request" 
               style="display: inline-block; background: #25D366; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">
              💬 Chat on WhatsApp
            </a>
          </div>
          
          <p style="font-size: 13px; color: #999; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
            Questions? Reply to this email or call us at <strong>+91 98765 43210</strong><br>
            <em>Latitude - Kids Outdoor Adventures, Bangalore</em>
          </p>
        </div>
      </div>
    `;
  } else {
    htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2D5A27, #3a7a30); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">✅ We Got Your Message!</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; color: #333;">Hi <strong>${data.name}</strong>,</p>
          
          <p style="font-size: 14px; color: #666;">Thank you for reaching out to Latitude! We've received your inquiry and will get back to you within <strong>24 hours</strong>.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2D5A27;">
            <h3 style="margin-top: 0; color: #2D5A27;">📝 Your Message</h3>
            <p style="margin: 8px 0; font-size: 13px; color: #666;">${data.message || "General inquiry"}</p>
          </div>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="https://wa.me/919876543210?text=Hi!%20I%20submitted%20an%20inquiry" 
               style="display: inline-block; background: #25D366; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">
              💬 Chat on WhatsApp
            </a>
          </div>
          
          <p style="font-size: 13px; color: #999; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
            Questions? Reply to this email or call us at <strong>+91 98765 43210</strong><br>
            <em>Latitude - Kids Outdoor Adventures, Bangalore</em>
          </p>
        </div>
      </div>
    `;
  }
  
  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    htmlBody: htmlBody
  });
}

function sendBusinessNotification(data, isBooking) {
  const subject = isBooking 
    ? `🎯 New Booking: ${data.program}` 
    : "📩 New Contact Form Inquiry";
  
  let htmlBody;
  
  if (isBooking) {
    htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #2D5A27;">🎯 New Booking Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Program:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong style="color: #2D5A27;">${data.program}</strong></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>${data.date}</strong></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Children:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.numChildren}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Spots Left:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.spotsAvailable}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.message || "N/A"}</td></tr>
        </table>
        <p style="margin-top: 20px; padding: 15px; background: #FFF8E1; border-left: 4px solid #E8A838; border-radius: 4px;">
          <strong>⚡ Action Required:</strong> Confirm availability and send payment details within 24 hours.
        </p>
        <p style="margin-top: 15px;">
          <a href="https://wa.me/${data.phone.replace(/\D/g, '')}" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            💬 WhatsApp ${data.name}
          </a>
        </p>
      </div>
    `;
  } else {
    htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #2D5A27;">📩 New Contact Form Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Child Age:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.childAge || "Not specified"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Program Interest:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.program || "Not specified"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.message || "N/A"}</td></tr>
        </table>
        <p style="margin-top: 15px;">
          <a href="https://wa.me/${data.phone.replace(/\D/g, '')}" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            💬 WhatsApp ${data.name}
          </a>
        </p>
      </div>
    `;
  }
  
  MailApp.sendEmail({
    to: BUSINESS_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}
```

4. **Update Configuration:**
   - Find line 7: `const BUSINESS_EMAIL = "hello@latitudeoutdoors.in";`
   - Replace with your actual business email

---

### **Step 4: Deploy as Web App** ✅ **COMPLETED!**

**Your deployment is live!** 🎉

**Your Web App URL:**
```
https://script.google.com/macros/s/AKfycbwSR8Z3QH7lyuw1MKJgfqFw0W0uO1xYZWvRNmPNlH_Xw6EMCOoRzpgWMJCRVIMveMbf/exec
```

✅ Deployment ID: `AKfycbwSR8Z3QH7lyuw1MKJgfqFw0W0uO1xYZWvRNmPNlH_Xw6EMCOoRzpgWMJCRVIMveMbf`

**What you completed:**
- ✅ Created and deployed your Apps Script
- ✅ Authorized the web app
- ✅ Got your deployment URL

👉 **Now proceed to Step 5 to connect your forms!**

---

### **Step 5: Connect Forms to Backend** ⚡ **DO THIS NOW!**

You need to insert your Web App URL into your HTML files so the forms can send data to Google Sheets.

#### **Option A: Automatic (Easiest) 🚀**

Run this command in your terminal:

```bash
cd /Users/stuartlittle/latitude

# Update contact.html with your deployment URL
sed -i '' 's|data-sheet-url=""|data-sheet-url="https://script.google.com/macros/s/AKfycbwSR8Z3QH7lyuw1MKJgfqFw0W0uO1xYZWvRNmPNlH_Xw6EMCOoRzpgWMJCRVIMveMbf/exec"|g' contact.html

echo "✅ Updated contact.html!"
```

#### **Option B: Manual (If automatic fails)**

**For contact.html (Multi-step booking form):**
1. Open `contact.html`
2. Find line with: `<form id="booking-form" class="p-6 sm:p-8" data-sheet-url="">`
3. Replace with:
   ```html
   <form id="booking-form" class="p-6 sm:p-8" data-sheet-url="https://script.google.com/macros/s/AKfycbwSR8Z3QH7lyuw1MKJgfqFw0W0uO1xYZWvRNmPNlH_Xw6EMCOoRzpgWMJCRVIMveMbf/exec">
   ```
4. Save the file (Cmd+S / Ctrl+S)

**Note:** The index.html homepage contact form was removed in favor of a CTA that redirects to contact.html, so you only need to update contact.html!

✅ **Checkpoint:** After updating, search your contact.html file for "AKfycbw" - you should find it!

---

## 🧪 Step 6: Test Your Setup!

### **Test the Booking Form:**

1. **Open contact.html in your browser:**
   ```bash
   cd /Users/stuartlittle/latitude
   open contact.html
   # OR just double-click contact.html in Finder
   ```

2. **Fill out the form:**
   - Step 1: Enter test parent details
   - Step 2: Select a program and date
   - Step 3: Add a message and submit

3. **Check for success:**
   - ✅ You should see a "Thank You!" success message
   - ✅ Check your Google Sheet - new row should appear with timestamp
   - ✅ Check parent's email (use your own email for testing)
   - ✅ Check your admin email for notification

### **Troubleshooting:**

**❌ "Failed to submit" error:**
- Open browser console (F12 or Cmd+Option+I)
- Look for CORS errors or network errors
- Verify the URL in contact.html matches your deployment URL exactly

**❌ Form submits but no data in sheet:**
- Check Apps Script → Executions tab for errors
- Verify sheet name is exactly "Sheet1" (case-sensitive)
- Check Logger (View → Logs) in Apps Script

**❌ No emails received:**
- Check spam folder
- Verify email addresses in CONFIG section of Apps Script
- Gmail has a 500 email/day limit (shouldn't hit it during testing)

**✅ Success looks like:**
```
Console: "Form data submitted successfully"
Sheet: New row with all form data + timestamp
Parent Email: Confirmation with booking details
Your Email: Notification with parent's info
```

---

## 📊 Step 7: Managing Your Submissions

### **Viewing Data:**
Open your Google Sheet: [Your Latitude Contact Forms Sheet]

Your sheet now collects:
- **Column A:** Timestamp (when submitted)
- **Column B:** Parent name
- **Column C:** Email address  
- **Column D:** Phone number
- **Column E:** Number of children
- **Column F:** Program selected
- **Column G:** Program date
- **Column H:** Custom message
- **Column I:** Special requirements
- **Column J:** How they heard about you
- **Column K:** Status (for tracking)

### **Status Tracking:**
Update Column K to track each inquiry:
- `New` - Just received (default)
- `Contacted` - You've reached out
- `Booked` - Confirmed and paid
- `Cancelled` - Cancelled booking
- `Follow-up` - Needs follow-up

### **Pro Tips:**
- **Add filters:** Click column header → Filter icon
- **Color code by status:** Select cells → Format → Conditional formatting
- **Sort by date:** Click column A header → Sort A→Z
- **Export data:** File → Download → CSV/Excel
- **Mobile access:** Install Google Sheets app to get instant notifications

### **Set Up Mobile Notifications (Optional):**
1. Install "Google Sheets" app on your phone
2. Open your "Latitude Contact Forms" sheet
3. Get notified whenever a new row is added!

**Email Setup:**
- Check your Gmail filters to make sure Latitude emails don't go to spam
- Star important bookings
- Set up labels: "Urgent Bookings", "Follow-up", etc.

---

## 🔒 Security & Privacy

- ✅ **Your data is secure:** Only you can access the Google Sheet
- ✅ **Web App URL is safe:** Can only POST data, cannot read your sheet
- ✅ **HTTPS encryption:** All data transmitted securely
- ⚠️ **Keep URL private:** Don't share in public repos (use .env files)
- ✅ **Parent emails:** Only used for confirmation, not stored elsewhere
- ✅ **GDPR/Privacy friendly:** Data stays in your Google account

**Best Practices:**
- Change your Apps Script password periodically
- Review Google Apps Script permissions regularly (myaccount.google.com)
- Don't share your Google Sheet link publicly
- Use status column to mark inquiries as "Completed" and archive old data

---

## 🚨 Troubleshooting

### "Script not found" error:
- Make sure Web App deployment is set to **"Anyone"** access

### Form submits but no data appears:
- Check Apps Script Logger (View → Logs) for errors
- Verify sheet names: "Bookings" and "Inquiries" (case-sensitive)
All Set!

Once you complete Step 5 and test successfully, your Latitude website will:
- ✅ **Collect bookings** via beautiful multi-step form
- ✅ **Store all data** in organized Google Sheet
- ✅ **Email parents** instant confirmation with booking details
- ✅ **Email you** notification with parent's contact info
- ✅ **Show success message** with WhatsApp quick-connect button

**What happens when someone books:**
1. Parent fills form on contact.html
2. Data instantly saved to your Google Sheet
3. Parent receives email: "Booking Request Received!"
4. You receive email: "New Booking: [Program Name]"
5. You can WhatsApp or call them within 24 hours

**Next Level Enhancements (Later):**
- 📅 Add Google Calendar integration
- 💰 Integrate payment gateway (Razorpay, Stripe)
- 📱 WhatsApp API auto-responses
- 📊 Analytics dashboard
- 🎫 Auto-generate booking confirmations/tickets
- 📧 Email drip campaigns for follow-ups

---

## 📞 Need Help?

**Common Issues:** Check the [Troubleshooting section](#-step-6-test-your-setup)

**Still stuck?**
- Check Apps Script execution logs
- Verify all URLs match exactly
- Test in incognito mode to rule out cache issues
- Check browser console for JavaScript errors

---

**🚀 Ready? Jump to [Step 5](#step-5-connect-forms-to-backend--do-this-now) and connect your form!**
- Test both forms thoroughly
- Customize email templates if needed
- Set up Google Sheets mobile app for instant notifications
- Consider adding auto-responses for common questions

---

**Need Help?** Check the [troubleshooting section](#-troubleshooting) or contact support.
