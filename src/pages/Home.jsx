import { useEffect, useState } from "react";
import { ContactCard } from "../components/ContactCard.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getApiUrl } from "../settings.js";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkOrCreateUser = async () => {
        try {
            const res = await fetch(getApiUrl(''), {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                return true;
            }

            if (res.status === 404) {
                const createRes = await fetch(getApiUrl(''), {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                });
                return createRes.ok;
            }

            throw new Error(`Unexpected status code: ${res.status}`);
        } catch (err) {
            console.error('User init error:', err);
            setError('Could not initialize user. Please try again.');
            return false;
        }
    };

    const fetchContacts = async () => {
        try {
            const res = await fetch(getApiUrl('/contacts'), {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            if (!res.ok) throw new Error(`Status ${res.status}`);
            const { contacts = [] } = await res.json();
            dispatch({ type: 'LOAD_CONTACTS', payload: contacts });
        } catch (err) {
            console.error('Fetch contacts error:', err);
            setError('Failed to load contacts. Please try again later.');
        }
    };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(getApiUrl('/contacts'), {
          method: 'GET',
          headers: {
            'accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }

        const data = await response.json();
        dispatch({ type: 'LOAD_CONTACTS', payload: data.contacts || [] });
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Failed to load contacts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact List</h1>
      
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : store.contacts.length === 0 ? (
        <div className="text-center">
          <p>Contact list empty</p>
        </div>
      ) : (
        <div className="card mx-auto" style={{ maxWidth: "1000px" }}>
          <div className="card-body p-0">
            {store.contacts.map(contact => (
              <div className="border-bottom" key={contact.id}>
                <ContactCard contact={contact} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};