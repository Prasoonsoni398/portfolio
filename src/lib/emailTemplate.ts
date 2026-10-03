/**
 * Themed HTML email generator for contact inquiries.
 * Aligned with the portfolio's Perplexity dark aesthetic (#121316, #20b8cd, #262930).
 */
export interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
  time?: string;
  subject?: string;
}

export function generateContactEmailHtml({
  name,
  email,
  message,
  time = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }),
  subject = "New Portfolio Inquiry"
}: ContactEmailProps): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${escapeHtml(subject)} - Prasoon Soni Portfolio</title>
  
  <style type="text/css">
    /* Universal Email & Viewport Resets */
    * {
      box-sizing: border-box !important;
    }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
      overflow-x: hidden !important;
      background-color: #0b0c0e !important;
      -webkit-text-size-adjust: 100% !important;
      -ms-text-size-adjust: 100% !important;
    }
    table, td {
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
      border-collapse: collapse !important;
    }
    table {
      table-layout: fixed !important;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    a {
      text-decoration: none;
      word-break: break-all !important;
      overflow-wrap: anywhere !important;
    }
    p, span, h1, div {
      word-break: break-word !important;
      overflow-wrap: anywhere !important;
    }
    
    /* Strict Mobile Adaptation (No Horizontal Scroll on Phone) */
    @media only screen and (max-width: 600px) {
      .outer-td {
        padding: 12px 6px !important;
      }
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 12px !important;
        margin: 0 auto !important;
      }
      .mobile-header-padding {
        padding: 20px 16px 14px 16px !important;
      }
      .mobile-body-padding {
        padding: 14px 14px !important;
      }
      .mobile-inner-card {
        padding: 14px 12px !important;
      }
      .mobile-action-padding {
        padding: 0 14px 20px 14px !important;
      }
      .mobile-footer-padding {
        padding: 14px 16px !important;
      }
      .mobile-title {
        font-size: 17px !important;
        line-height: 1.35 !important;
      }
      .mobile-btn {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        padding: 12px 14px !important;
        font-size: 13px !important;
        text-align: center !important;
      }
      .mobile-avatar-col {
        width: 38px !important;
        padding-right: 10px !important;
      }
      .mobile-avatar-box {
        width: 36px !important;
        height: 36px !important;
        line-height: 36px !important;
        font-size: 18px !important;
        border-radius: 10px !important;
      }
      .mobile-name {
        font-size: 15px !important;
      }
      .mobile-email {
        font-size: 11px !important;
      }
      .mobile-message {
        font-size: 13px !important;
        line-height: 1.55 !important;
        padding: 12px 12px !important;
      }
    }
  </style>

  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #0b0c0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #f3f4f6; width: 100% !important; min-width: 100% !important; max-width: 100% !important; overflow-x: hidden !important;">
  
  <!-- Outer Wrapper Table -->
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b0c0e; width: 100% !important; min-width: 100% !important; max-width: 100% !important; table-layout: fixed; overflow-x: hidden;">
    <tr>
      <td align="center" class="outer-td" style="padding: 36px 12px; width: 100%; box-sizing: border-box;">
        
        <!--[if (gte mso 9)|(IE)]>
        <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="600">
        <tr>
        <td style="padding: 0;">
        <![endif]-->
        
        <!-- Main Email Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="email-container" style="max-width: 600px; width: 100% !important; background-color: #121418; border: 1px solid #262930; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55); margin: 0 auto; table-layout: fixed;">
          
          <!-- Top Glowing Accent Header Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #20b8cd 0%, #6366f1 50%, #10b981 100%); line-height: 4px; font-size: 0; padding: 0;">&nbsp;</td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td class="mobile-header-padding" style="padding: 30px 28px 18px 28px; border-bottom: 1px solid #20232a; box-sizing: border-box;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed; width: 100%;">
                <tr>
                  <td style="padding: 0; width: 100%;">
                    <!-- Pill Badge -->
                    <div style="display: inline-block; padding: 4px 10px; background-color: rgba(32, 184, 205, 0.12); border: 1px solid rgba(32, 184, 205, 0.3); border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: 700; color: #20b8cd; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;">
                      ✦ New Portfolio Notification
                    </div>
                    
                    <!-- Title -->
                    <h1 class="mobile-title" style="margin: 0; font-size: 19px; font-weight: 800; color: #f3f4f6; letter-spacing: -0.02em; line-height: 1.35; word-break: break-word; overflow-wrap: anywhere;">
                      A message by <span style="color: #20b8cd;">${escapeHtml(name)}</span> has been received
                    </h1>
                    
                    <p style="margin: 6px 0 0 0; font-size: 13px; color: #9ca3af; line-height: 1.45; word-break: break-word;">
                      Kindly respond at your earliest convenience.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender & Message Box -->
          <tr>
            <td class="mobile-body-padding" style="padding: 22px 28px; box-sizing: border-box;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="mobile-inner-card" style="background-color: #181a20; border: 1px solid #262930; border-radius: 14px; padding: 18px; width: 100%; table-layout: fixed; box-sizing: border-box;">
                <tr>
                  <td style="padding: 0; width: 100%;">
                    <!-- Sender Details Table -->
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed; width: 100%;">
                      <tr>
                        <!-- Avatar Column -->
                        <td width="48" valign="top" style="vertical-align: top; padding-right: 12px; width: 48px;" class="mobile-avatar-col">
                          <div class="mobile-avatar-box" style="width: 42px; height: 42px; background-color: rgba(32, 184, 205, 0.15); border: 1px solid rgba(32, 184, 205, 0.35); border-radius: 12px; text-align: center; line-height: 42px; font-size: 20px;">
                            👤
                          </div>
                        </td>
                        
                        <!-- Sender Meta Column -->
                        <td valign="top" style="vertical-align: top; width: calc(100% - 48px); overflow: hidden;">
                          <div class="mobile-name" style="font-size: 16px; font-weight: 700; color: #ffffff; line-height: 1.3; word-break: break-word; overflow-wrap: anywhere;">
                            ${escapeHtml(name)}
                          </div>
                          <div class="mobile-email" style="margin-top: 3px; font-size: 12px; color: #20b8cd; font-family: monospace; word-break: break-all; overflow-wrap: anywhere;">
                            <a href="mailto:${escapeHtml(email)}" style="color: #20b8cd; text-decoration: none;">${escapeHtml(email)}</a>
                          </div>
                          <div style="margin-top: 3px; font-size: 11px; font-family: monospace; color: #6b7280; word-break: break-word;">
                            Received at: ${escapeHtml(time)}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message Body Quote Block -->
                <tr>
                  <td style="padding-top: 14px; width: 100%;">
                    <div class="mobile-message" style="background-color: #121316; border-left: 3px solid #20b8cd; border-top: 1px solid #20232a; border-right: 1px solid #20232a; border-bottom: 1px solid #20232a; border-radius: 8px; padding: 14px; margin-top: 4px; box-sizing: border-box; width: 100%;">
                      <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; color: #6b7280; margin-bottom: 6px; letter-spacing: 0.06em;">
                        Message Content
                      </div>
                      <p style="margin: 0; font-size: 13.5px; line-height: 1.6; color: #e5e7eb; white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere;">${escapeHtml(message)}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Action Button -->
          <tr>
            <td class="mobile-action-padding" style="padding: 0 28px 24px 28px; box-sizing: border-box;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed; width: 100%;">
                <tr>
                  <td align="center" style="padding: 0; width: 100%;">
                    <a href="mailto:${escapeHtml(email)}?subject=Re:%20Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}" class="mobile-btn" style="display: inline-block; padding: 12px 28px; background-color: #20b8cd; color: #041f24; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 14px rgba(32, 184, 205, 0.25); text-align: center; mso-padding-alt: 0; box-sizing: border-box;">
                      <!--[if mso]>
                      <i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 30pt">&nbsp;</i>
                      <![endif]-->
                      <span style="mso-text-raise: 15pt;">✉ Reply directly to ${escapeHtml(name)}</span>
                      <!--[if mso]>
                      <i style="letter-spacing: 25px; mso-font-width: -100%">&nbsp;</i>
                      <![endif]-->
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Information -->
          <tr>
            <td class="mobile-footer-padding" style="padding: 18px 24px; background-color: #0e1013; border-top: 1px solid #20232a; text-align: center; box-sizing: border-box;">
              <p style="margin: 0; font-size: 11px; color: #6b7280; line-height: 1.55; word-break: break-word; overflow-wrap: anywhere;">
                This notification was automatically dispatched from the contact form on <br>
                <strong style="color: #9ca3af;">Prasoon Soni's Portfolio</strong> — Trainee @ Raj Digital
              </p>
            </td>
          </tr>

        </table>
        
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
