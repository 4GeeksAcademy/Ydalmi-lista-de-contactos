import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getApiUrl } from "../settings.js";

export const NewContact = () => {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch(getApiUrl('/contacts'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(contact)
            });

            if (!response.ok) {
                throw new Error('Failed to create contact');
            }

            const data = await response.json();
            
            dispatch({ type: 'ADD_CONTACT', payload: data });
            
            navigate('/');
        } catch (error) {
            console.error('Error creating contact:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add a new contact</h1>
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
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={() => navigate('/')}
                            >
                                Go back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};