(README in progress)
# Mail
Project 3 for CS50’s Web Programming with Python and JavaScript. Project was made using JavaScript, HTML and CSS.

## Overview
A design of mail application that allows users to send, receive, reply and archive emails. Emails can be sent only between
users on this app. There is login and registration process already inside. Emails are entirely stored in the repository 
database, so email address and credentials need not be real. Once you are signed in, you are taken to the Inbox page of 
the mail client. Click the buttons to navigate to your Sent and Archived mailboxes. The “Compose” button takes you to a 
page that will let you compose a new email. Each time you click a button, though, you’re not being taken to a new route 
or making a new web request: instead, this entire application is just a single page, with JavaScript used to control the 
user interface. You’ll get mail, send mail, and update emails by using this application’s API. CS50 team has already 
written the entire API (and documented it [`here`](https://cs50.harvard.edu/web/2020/projects/3/mail/#api)), so that 
you can use it in your JavaScript code.

## API
Mails are sent, received and updated by using this application’s API. Sending a `GET` request to `/emails/inbox` may
result for example in a JSON response like this:
```
[
    {
        "id": 100,
        "sender": "foo@example.com",
        "recipients": ["bar@example.com"],
        "subject": "Hello!",
        "body": "Hello, world!",
        "timestamp": "Jan 2 2020, 12:00 AM",
        "read": false,
        "archived": false
    },
    {
        "id": 95,
        "sender": "baz@example.com",
        "recipients": ["bar@example.com"],
        "subject": "Meeting Tomorrow",
        "body": "What time are we meeting?",
        "timestamp": "Jan 1 2020, 12:00 AM",
        "read": true,
        "archived": false
    }
]
```
Each email has its unique id. Note that if the email doesn’t exist, or if the user does not have access to the email, 
the route instead return a 404 Not Found error with a JSON response of `{"error": "Email not found."}`. If the email is 
sent successfully, the route will respond with a 201 status code and a JSON response of 
`{"message": "Email sent successfully."}`.

## Specification
The following requirements were fulfilled:

- [x] **Send Mail**: When a user submits the email composition form, add JavaScript code to actually send the email.
    - [x] You’ll likely want to make a `POST` request to `/emails`, passing in values for `recipients`, `subject`, and `body`.
    - [x] Once the email has been sent, load the user’s sent mailbox.
- [x] **Mailbox**: When a user visits their Inbox, Sent mailbox, or Archive, load the appropriate mailbox.
  - [x] You’ll likely want to make a `GET` request to `/emails/<mailbox>` to request the emails for a particular mailbox.
  - [x] When a mailbox is visited, the application should first query the API for the latest emails in that mailbox.
  - [x] When a mailbox is visited, the name of the mailbox should appear at the top of the page (this part is done for you).
  - [x] Each email should then be rendered in its own box (e.g. as a `<div>` with a border) that displays who the email is from,
what the subject line is, and the timestamp of the email.
  - [x] If the email is unread, it should appear with a white background. If the email has been read, it should appear with
a gray background.
- [x] **View Email**: When a user clicks on an email, the user should be taken to a view where they see the content of that email.
  - [x] You’ll likely want to make a `GET` request to `/emails/<email_id>` to request the email.
  - [x] Your application should show the email’s sender, recipients, subject, timestamp, and body.
  - [x] You’ll likely want to add an additional `div` to `inbox.html` (in addition to `emails-view` and `compose-view`) for 
displaying the email. Be sure to update your code to hide and show the right views when navigation options are clicked.
  - [x] See the hint in the Hints section about how to add an event listener to an HTML element that you’ve added to the DOM.
  - [x] Once the email has been clicked on, you should mark the email as read. Recall that you can send a `PUT` request to
`/emails/<email_id>` to update whether an email is read or not.
- [x] **Archive and Unarchive**: Allow users to archive and unarchive emails that they have received.
  - [x] When viewing an Inbox email, the user should be presented with a button that lets them archive the email. When 
viewing an Archive email, the user should be presented with a button that lets them unarchive the email. 
This requirement does not apply to emails in the Sent mailbox.
  - [x] Recall that you can send a `PUT` request to `/emails/<email_id>` to mark an email as archived or unarchived.
  - [x] Once an email has been archived or unarchived, load the user’s inbox.
- [x] **Reply**: Allow users to reply to an email.
  - [x] When viewing an email, the user should be presented with a “Reply” button that lets them reply to the email.
  - [x] When the user clicks the “Reply” button, they should be taken to the email composition form.
  - [x] Pre-fill the composition form with the `recipient` field set to whoever sent the original email.
  - [x] Pre-fill the `subject` line. If the original email had a subject line of `foo`, the new subject line should be 
`Re: foo`. (If the subject line already begins with `Re: `, no need to add it again.)
  - [x] Pre-fill the `body` of the email with a line like `On Jan 1 2020, 12:00 AM foo@example.com wrote:` 
followed by the original text of the email.

## Setup
Requires Python3 and the package installer for Python (pip) to run:

* Clone the repository
* In your terminal, `cd` into the `mail` directory
* Run `python manage.py makemigrations mail`
* Run the app locally: `python manage.py runserver`
* Visit the site: `http://localhost:8000` and you are ready to go!

## Credits
Readme created with CS50W materials: (https://cs50.harvard.edu/web/2020/projects/3/mail/).