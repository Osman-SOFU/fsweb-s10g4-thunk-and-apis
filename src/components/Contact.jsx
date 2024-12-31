import React from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useContact, deleteContact } from '../services/tanStack.js';

export default function Contact() {
  const { contactId } = useParams();
  const history = useHistory();

  const { isPending, error, data: contact } = useContact(contactId);

  const mutation = deleteContact();

  if (isPending) return 'Loading...';

  if (error) return 'Hata: ' + error.message;

  if (!contact) return 'Contact not found';

  const handleDelete = (e) => {
    mutation.mutate(e);
    history.push('/');
  };

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1 data-testid="full_name">
          {contact.first_name || contact.last_name ? (
            <>
              {contact.first_name} {contact.last_name}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
        </h1>

        {contact.email && (
          <p>
            <a target="_blank" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        )}

        {contact.description && <p>{contact.description}</p>}

        <div>
          <button className="delete" onClick={() => handleDelete(contactId)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
