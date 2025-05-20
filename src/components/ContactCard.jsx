import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import mujerImage from "../assets/img/mujer .avif";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../settings.js";

export const ContactCard = ({ contact }) => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this contact?")) {
            return;
        }
        
        try {
            const response = await fetch(getApiUrl(`/contacts/${contact.id}`), {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete contact');
            }

            dispatch({ type: 'DELETE_CONTACT', payload: contact.id });
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };
    
    const handleEdit = () => {
        navigate(`/edit/${contact.id}`, { state: { contact } });
    };

    return (
        <div className="row align-items-center p-3">
            <div className="col-2 col-md-1 text-center">
                <img 
                    src={mujerImage} 
                    className="rounded-circle" 
                    alt={contact.name}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
            </div>
            <div className="col-8 col-md-10 ps-3">
                <h5 className="fw-bold mb-2">{contact.name}</h5>
                <p className="mb-1">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {contact.address || "No address provided"}
                </p>
                <p className="mb-1">
                    <i className="fas fa-phone me-2"></i>
                    {contact.phone || "No phone provided"}
                </p>
                <p className="mb-1">
                    <i className="fas fa-envelope me-2"></i>
                    <small className="text-muted">{contact.email || "No email provided"}</small>
                </p>
            </div>
            <div className="col-2 col-md-1 text-end d-flex d-column">
                <button onClick={handleEdit} className="p-1 btn btn-sm btn-primary me-2">
                    <i className="fas fa-edit"></i>
                </button>
                <button onClick={handleDelete} className="p-1 btn btn-sm btn-danger">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    );
};