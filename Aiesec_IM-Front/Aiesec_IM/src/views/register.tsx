import React, { useState } from 'react';
import { register } from '../api';
const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Réinitialiser les erreurs
        setError('');
        // Vérifier si les mots de passe correspondent
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // Appeler l'API d'inscription
        register(username, password)
            .then((response) => {
                if (response.message) {
                setError(response.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('An error occurred');
            });
    }
    return (
        <div className="form-container"> {/* Utilisez le conteneur de formulaire personnalisé */}
            <form className="form-box" onSubmit={handleSubmit}>
                <h2 className="form-heading">Register</h2>
                {error && <p className="error-message">{error}</p>}
                <div>
                    <label className="form-label" htmlFor="email">Username:</label>
                    <input
                        type="text"
                        id="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div>
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div>
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <button type="submit" className="form-button">Register</button>
            </form>
        </div>
    );
};

export default Register;
