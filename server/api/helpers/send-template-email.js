module.exports = {
  friendlyName: 'Send template email',

  description: 'Send an email using a template.',

  extendedDescription:
    'To ease testing and development, if the provided "to" email address ends in "@example.com", ' +
    'then the email message will be written to the terminal instead of actually being sent.' +
    '(Thanks [@simonratner](https://github.com/simonratner)!)',

  inputs: {
    template: {
      description:
        'The relative path to an EJS template within our `views/emails/` folder -- WITHOUT the file extension.',
      extendedDescription:
        'Use strings like "foo" or "foo/bar", but NEVER "foo/bar.ejs" or "/foo/bar".  For example, ' +
        '"internal/email-contact-form" would send an email using the "views/emails/internal/email-contact-form.ejs" template.',
      example: 'email-reset-password',
      type: 'string',
      required: true,
    },

    templateData: {
      description:
        'A dictionary of data which will be accessible in the EJS template.',
      extendedDescription:
        'Each key will be a local variable accessible in the template.  For instance, if you supply ' +
        'a dictionary with a `friends` key, and `friends` is an array like `[{name:"Chandra"}, {name:"Mary"}]`),' +
        'then you will be able to access `friends` from the template:\n' +
        '```\n' +
        '<ul>\n' +
        '<% for (friend of friends){ %><li><%= friend.name %></li><% }); %>\n' +
        '</ul>\n' +
        '```' +
        '\n' +
        'This is EJS, so use `<%= %>` to inject the HTML-escaped content of a variable, `<%= %>` to skip HTML-escaping ' +
        'and inject the data as-is, or `<% %>` to execute some JavaScript code such as an `if` statement or `for` loop.',
      type: {},
      defaultsTo: {},
    },

    to: {
      type: 'ref',
      required: true,
    },

    toName: {
      description: 'Name of the primary recipient as displayed in their inbox.',
      example: 'Nola Thacker',
    },

    inReplyTo: {
      description: 'Message-Id of the email thread, used to reply to emails',
      type: 'string',
    },

    references: {
      description: 'Array list of Message-Id',
      type: 'ref',
    },

    subject: {
      description: 'The subject of the email.',
      example: 'Hello there.',
      defaultsTo: '',
    },

    from: {
      description:
        'An override for the default "from" email that\'s been configured.',
      example: 'anne.martin@example.com',
      isEmail: true,
    },

    fromName: {
      description: 'An override for the default "from" name.',
      example: 'Anne Martin',
    },

    layout: {
      description:
        'Set to `false` to disable layouts altogether, or provide the path (relative ' +
        'from `views/layouts/`) to an override email layout.',
      defaultsTo: 'layout-email',
      custom: (layout) => layout === false || _.isString(layout),
    },

    ensureAck: {
      description:
        'Whether to wait for acknowledgement (to hear back) that the email was successfully sent (or at least queued for sending) before returning.',
      extendedDescription:
        'Otherwise by default, this returns immediately and delivers the request to deliver this email in the background.',
      type: 'boolean',
      defaultsTo: false,
    },

    cc: {
      description: 'The email addresses of recipients copied on the email.',
      example: ['simon.riley@example.com'],
    },

    bcc: {
      description:
        'The email addresses of recipients secretly copied on the email.',
      example: ['jahnna.n.malcolm@example.com'],
    },

    attachments: {
      description:
        'Attachments to include in the email, with the file content encoded as base64.',
      type: 'ref',
      defaultsTo: [],
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'Email delivery report',
      outputDescription: 'A dictionary of information about what went down.',
      outputType: {
        loggedInsteadOfSending: 'boolean',
      },
    },
  },

  fn: async function ({
    template,
    templateData,
    to,
    toName,
    inReplyTo,
    references,
    subject,
    from,
    fromName,
    layout,
    ensureAck,
    cc,
    bcc,
    attachments,
  }) {
    var path = require('path');
    var url = require('url');
    var util = require('util');
    var nodemailer = require('nodemailer');

    if (!_.startsWith(path.basename(template), 'email-')) {
      sails.log.warn(
        'The "template" that was passed in to `sendTemplateEmail()` does not begin with ' +
          '"email-" -- but by convention, all email template files in `views/emails/` should ' +
          'be namespaced in this way.  (This makes it easier to look up email templates by ' +
          'filename; e.g. when using CMD/CTRL+P in Sublime Text.)\n' +
          'Continuing regardless...'
      );
    }

    if (_.startsWith(template, 'views/') || _.startsWith(template, 'emails/')) {
      throw new Error(
        'The "template" that was passed in to `sendTemplateEmail()` was prefixed with\n' +
          '`emails/` or `views/` -- but that part is supposed to be omitted.  Instead, please\n' +
          'just specify the path to the desired email template relative from `views/emails/`.\n' +
          'For example:\n' +
          "  template: 'email-reset-password'\n" +
          'Or:\n' +
          "  template: 'admin/email-contact-form'\n" +
          " [?] If you're unsure or need advice, see https://sailsjs.com/support"
      );
    } //•

    // Determine appropriate email layout and template to use.
    var emailTemplatePath = path.join('emails/', template);
    var emailTemplateLayout;
    if (layout) {
      emailTemplateLayout = path.relative(
        path.dirname(emailTemplatePath),
        path.resolve('layouts/', layout)
      );
    } else {
      emailTemplateLayout = false;
    }

    // Compile HTML template.
    // > Note that we set the layout, provide access to core `url` package (for
    // > building links and image srcs, etc.), and also provide access to core
    // > `util` package (for dumping debug data in internal emails).
    var htmlEmailContents = await sails
      .renderView(
        emailTemplatePath,
        _.extend({ layout: emailTemplateLayout, url, util }, templateData)
      )
      .intercept((err) => {
        err.message =
          'Could not compile view template.\n' +
          '(Usually, this means the provided data is invalid, or missing a piece.)\n' +
          'Details:\n' +
          err.message;
        return err;
      });

    var dontActuallySend =
      sails.config.environment === 'test';
    if (dontActuallySend) {
      sails.log(
        'Skipped sending email, either because the "To" email address ended in "@example.com"\n' +
          'or because the current `sails.config.environment` is set to "test".\n' +
          '\n' +
          'But anyway, here is what WOULD have been sent:\n' +
          '-=-=-=-=-=-=-=-=-=-=-=-=-= Email log =-=-=-=-=-=-=-=-=-=-=-=-=-\n' +
          'To: ' +
          to +
          '\n' +
          'Subject: ' +
          subject +
          '\n' +
          '\n' +
          'Body:\n' +
          htmlEmailContents +
          '\n' +
          '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-'
      );
    } else {
      // Otherwise, continue to actually send the email.

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PWD
        },
      });

      const subjectLinePrefix =
        sails.config.environment === 'production'
          ? ''
          : sails.config.environment === 'staging'
          ? '[FROM STAGING] '
          : '';
      const mailOptions = {
        from: process.env.EMAIL_FROM, // if using Gmail, "from" gets set to the authenticated email
        to: to,
        cc: cc,
        bcc: bcc,
        inReplyTo: inReplyTo,
        references: references,
        subject: subjectLinePrefix + subject,
        html: htmlEmailContents,
        attachments,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        sails.log('Email sent: ' + info.response);
        sails.log('successfully sent email!');
      } catch (err) {
        console.log(err);
      }
    }

    // All done!
    return {
      loggedInsteadOfSending: dontActuallySend,
    };
  },
};
