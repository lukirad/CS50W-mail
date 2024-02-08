document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);


  document.querySelector('#compose-form').addEventListener('submit', send_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#oneMail-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_oneMail(id) {
  fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {

      console.log(id);

      document.querySelector('#emails-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'none';
      document.querySelector('#oneMail-view').style.display = 'block';

      document.querySelector('#oneMail-view').innerHTML = `
        <b>From:</b> ${email.sender}<br>
        <b>To:</b> ${email.recipients}<br>
        <b>Subject:</b> ${email.subject}<br>
        <b>Timestamp:</b> ${email.timestamp}<br>
        <input type="button" id="Reply" class="btn btn-outline-primary" value="Reply"></input>
        <hr>
        ${email.body}
        <hr>
        <input type="button" id="Archive" class="btn btn-danger" value="Archive"></input>
      `;


      fetch(`/emails/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          read: true
        })
      })



      const archBtn = document.getElementById('Archive');
      archBtn.value = email.archived ? 'Unarchive' : 'Archive';
      archBtn.addEventListener('click', () => {
        email.archived = !email.archived;
        archBtn.value = email.archived ? 'Unarchive' : 'Archive';

        console.log(`Email archived: ${email.archived}`);

        fetch(`/emails/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            archived: email.archived
          })
        })
        .then(response => {
          load_mailbox('inbox');
        })
      });
      const replyBtn = document.getElementById('Reply');
      replyBtn.addEventListener('click', function() {
        compose_email();
        document.querySelector('#compose-recipients').value = email.sender;
        document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: ${email.body}`;
        subject = document.querySelector('#compose-subject');
        if (email.subject.startsWith("Re: ")) {
          subject.value = email.subject
        } else {
          subject.value = `Re: ${email.subject}`;
        }
      });
    });
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#oneMail-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {

    emails.forEach(oneMail => {
      console.log(oneMail);

      const mailItem = document.createElement('div');
      mailItem.classList.add("email");

      if (oneMail.read) {
        mailItem.classList.add("read-email");
      }

      mailItem.innerHTML = `
        <div class="sender">${oneMail.sender}</div>
        <div class="content">
          <h5 class="subject">${oneMail.subject}</h5>
          <h6 class="time">${oneMail.timestamp}</h6>
        </div>
      `;
      mailItem.addEventListener('click', function() {
        load_oneMail(oneMail.id);
      });
      document.querySelector('#emails-view').append(mailItem);
      // ... do something else with emails ...
    })
  });
}

function send_email(event) {
  event.stopImmediatePropagation();
  event.preventDefault();

  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
      load_mailbox('sent');
  });

}
