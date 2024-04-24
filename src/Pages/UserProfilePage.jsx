import {useEffect, useState, useContext} from 'react'
import db_URL from '../Interceptor/myApi'
import {AuthContext} from "../context/AuthContextWrapper"
import { useParams } from 'react-router-dom';


function UserProfilePage() {
const [userProfile, setUserProfile] = useState(null);
const {user} = useContext(AuthContext)
const {userId} = useParams()
const [errorMessage, setErrorMessage] = useState(undefined);

// useEffect(() => {
// fetchProfile()

// },[])
useEffect(() => {
  const getUserProfile = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      db_URL
        .get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUserProfile(response.data);
          setLoading(false);
          console.log(response.data)
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    } else {
      setErrorMessage("User not logged in");
    }
  };

  getUserProfile();
}, [userId]);


// async function fetchProfile() {
//   try {
//     const {data} = await db_URL.get(/users/ + userId);
//     setUserProfile(data);
//     console.log(data)
    
//   } catch (error) {
//     console.log("Error fetching user info:", error);
//   }
// }
  return (

    <div className="UserProfileDetailsPage bg-gray-100 py-6 px-4">
      <h1>User Profile</h1>
    <div className="bg-white p-8 rounded-lg shadow-md mb-6">
      {userProfile && (
        <>
         
          <img
            src={userProfile.image}
            alt="profile-photo"
            className="rounded-full w-32 h-32 object-cover border-2 border-gray-300"
          />
          <h1 className="text-2xl mt-4 font-bold absolute">
            {userProfile.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24 mb-4 border-b pb-4">
            <p className="text-left mb-2 border-b pb-2">
              <strong>Email:</strong> {userProfile.email}
            </p>
          </div>
        </>
      )}
    </div>
  </div>
  )
}

export default UserProfilePage