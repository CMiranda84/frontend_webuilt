import {useEffect, useState, useContext} from 'react'
import db_URL from '../Interceptor/myApi'
import {AuthContext} from "../context/AuthContextWrapper"
import { useParams } from 'react-router-dom';
import useAuth from '../context/useAuth';
import Loader from '../components/Loader/Loader';


function UserProfilePage() {
const [userProfile, setUserProfile] = useState(null);
const {user} = useContext(AuthContext)
const {userId} = useParams()
const [errorMessage, setErrorMessage] = useState(undefined);
const [formState, setFormState] = useState(false)

useEffect(() => {
fetchUserProfile()
},[])

async function fetchUserProfile() {
  const storedToken = localStorage.getItem("authToken");
  try {
    const response = await db_URL.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    setUserProfile(response.data)
    console.log(response)
    
  } catch (error) {
    console.log("error getting user profile", error)
  }
  
}

if (!userProfile) {
  return <Loader/>
}

  return (

    <div className="bg-gray-100 py-6 px-4 m-7">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
    <div className="bg-white p-8 rounded-lg shadow-md mb-6">
    {!formState ? (
        <div className="flex flex-col md:flex-row">
          <div className="bg-white p-4 w-full ">
            <div className="bg-blue-500 text-white p-4 rounded-lg mb-4">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
                {userProfile.name ||userProfile.email}
              </h1>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 md:mr-4">
                  <img
                    src={userProfile.image}
                    alt="Avatar"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 md:mb-0"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    Role: {userProfile.role}
                  </p>
                  <p className="text-lg font-semibold">
                    Name: {userProfile.name}
                  </p>
                  <p className="text-lg font-semibold">
                    Email: {userProfile.email || "N/A"}
                  </p>
                  {/* {userProfile && userProfile.role === "admin" ? (
                    <button onClick={handleDashboard}>
                      Go to the Dashboard
                    </button>
                  ) : null} */}
                  {/* <SelectProfilepage
                    // dataActivity={dataActivity}
                    // setDataActivity={setDataActivity}
                    select={select}
                    setSelect={setSelect}
                  /> */}
                </div>
              </div>
            </div>
            <div className="mt-4">
              {/* <button
                onClick={() => setFormState(!formState)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update your profile
              </button> */}
              {/* <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete Your Account
              </button> */}
            </div>
          </div>
        </div>
      )
       : (
        <UpdateProfilButton
          reloadInfos={reloadInfos}
          setReloadInfos={setReloadInfos}
          getUserInfo={getUserInfo}
          setFormState={setFormState}
          updateForm={updateForm}
          userDetail={userDetail}
        />
      )}
    </div>
  </div>
  )
}

export default UserProfilePage