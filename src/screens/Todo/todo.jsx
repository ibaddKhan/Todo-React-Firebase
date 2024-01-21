import React, { useContext } from 'react'
import UserContext from '../../context/userContext';

const Todo = () => {
  let {uid ,isUser,setIsUser}=useContext(UserContext)
  console.log(uid);
  console.log(typeof isUser);
  console.log(isUser);
  return (
    <div>Todo</div>
  )
}

export default Todo