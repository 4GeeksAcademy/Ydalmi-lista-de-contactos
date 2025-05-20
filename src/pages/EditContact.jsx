import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getApiUrl } from "../settings.js";

export const EditContact = () => {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [originalContact, setOriginalContact] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { dispatch } = useGlobalReducer();

    useEffect(() => {
        if (location.state && location.state.contact) {
            setContact(location.state.contact);
            setOriginalContact(location.state.contact);
        } else {
            fetchContact();
        }
    }, [id, location]);

    const fetchContact = async () => {
        try {
            const response = await fetch(getApiUrl(`/contacts/${id}`), {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch contact');
            }

            const data = await response.json();
            setContact(data);
            setOriginalContact(data);
        } catch (error) {
            console.error('Error fetching contact:', error);
            navigate('/');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const hasChanges = () => {
        if (!originalContact) return false;
        
        return (
            contact.name !== originalContact.name ||
            contact.email !== originalContact.email ||
            contact.phone !== originalContact.phone ||
            contact.address !== originalContact.address
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!hasChanges()) {
            navigate('/');
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await fetch(getApiUrl(`/contacts/${id}`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(contact)
            });

            if (!response.ok) {
                throw new Error('Failed to update contact');
            }

            const data = await response.json();
            
            dispatch({ type: 'UPDATE_CONTACT', payload: data });
            
            navigate('/');
        } catch (error) {
            console.error('Error updating contact:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Edit Contact</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                name="name"
                                value={contact.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                name="email"
                                value={contact.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input 
                                type="tel" 
                                className="form-control" 
                                id="phone" 
                                name="phone"
                                value={contact.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="address" 
                                name="address"
                                value={contact.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={loading || !hasChanges()}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};