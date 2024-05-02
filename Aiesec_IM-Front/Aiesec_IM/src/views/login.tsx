import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Réinitialiser les erreurs
        setError('');
        // Appeler l'API de connexion
        login(username, password)
            .then((response) => {
                if (response.token) {
                    // Stocker le jeton dans le stockage local
                    localStorage.setItem('token', response.token);
                    // Recharger la page
                    navigate('/');
        
                }
                else {
                    setError('Invalid username or password');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('An error occurred');
            });

    }
    return (
        <div className="form-container"> {/* Utilisez le conteneur de formulaire personnalisé */}
            <form className="form-box" onSubmit={handleSubmit} method='post'> {/* Utilisez la boîte de formulaire personnalisée et la méthode 'post' */}
                <h2 className="form-heading">Login</h2>
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
                <button type="submit" className="form-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
