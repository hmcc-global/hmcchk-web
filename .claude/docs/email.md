# Email

- Templates in `server/views/emails/` as `email-*.ejs` (and `form-*.ejs` for form-success bodies); layout `views/layouts/layout-email.ejs`.
- Send with `sails.helpers.sendTemplateEmail.with({ template, templateData, to, subject })`.
- `disableSendEmails: true` in `custom.js` logs the rendered HTML instead of sending. Production flips it. Changing it affects real members.
- SMTP is Gmail OAuth2: `EMAIL_FROM`, `GOOGLE_CLIENT_ID`, `EMAIL_CLIENT_SECRET`, `EMAIL_REFRESH_TOKEN`. Non-production subjects get a `[UAT]` prefix.
