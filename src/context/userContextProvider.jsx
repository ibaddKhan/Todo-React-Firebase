import React, { useState } from 'react'
import UserContext from './userContext'
import { auth } from "../config/firebaseconfig"
import { onAuthStateChanged } from 'firebase/auth';     



const UserContextProvider = ({ children }) => {
 let [uid , setUid]=useState("")
 let [isUser, setIsUser] = useState(false)

    onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      setIsUser(true)
      setUid(userId)
    } else {
        console.log("not a user");
    }
  });
    return (
        <UserContext.Provider value={{uid:uid ,isUser,setIsUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider