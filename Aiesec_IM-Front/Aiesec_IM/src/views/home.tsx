import { getProfile } from "../api";
import { useEffect , useState } from "react";


export default function Profile() {
  const [profile, setProfile] = useState({id: '', username: '', password: ''});
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile(token)
        .then((response) => {
          setProfile(response);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, []);
  // si l'utilisateur n'est pas connecté afficher bienvenue
    if (!localStorage.getItem('token')) {
        return <h1>Welcome</h1>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {profile.username}</p>
        </div>
    );

    
}
