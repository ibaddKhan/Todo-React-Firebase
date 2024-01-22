import { useNavigate } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/userContext';
import { auth, storage, db } from '../../config/firebaseconfig';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { signOut } from 'firebase/auth'

const Todo = () => {
  let { uid, isUser, setIsUser } = useContext(UserContext);
  let [todoVal, setTodo] = useState('');
  let [newtodoVal, setNewTodo] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  let nav = useNavigate()
  
  function logout() {
    signOut(auth).then(() => {
      setIsUser(false)
      console.log("logged out");
    }).catch((error) => {
      console.log(error);
    })
  }

  if (!isUser) {
    nav("/login")
  }
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'todos'), where('uid', '==', uid), orderBy('postDate', 'desc'));
      const querySnapshot = await getDocs(q);

      const tasksData = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() });
      });

      setTasks(tasksData);
    };

    fetchData();
  }, [uid]);

  const addTask = async (e) => {
    e.preventDefault();
    if (todoVal.length > 0) {
      let obj = {
        uid: uid,
        todo: todoVal,
        isDone: false,
        postDate: Timestamp.now(),
      }
      await addDoc(collection(db, 'todos'), obj)
        .then((res) => {
          setTasks([{ id: res.id, ...obj }, ...tasks])
          console.log(res);
          setTodo('');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('Please enter a task');
    }
  };
  const handleSaveEdit = async (task, i) => {
    const taskRef = doc(db, 'todos', editTaskId);
    await updateDoc(taskRef, { todo: newtodoVal }).then(() => {
      tasks.splice(i, 1, { todo: newtodoVal })
      setTasks([...tasks])
    })
  };

  const handleDelete = async (taskId, i) => {
    const taskRef = doc(db, 'todos', taskId);
    await deleteDoc(taskRef).then(() => {
      tasks.splice(i, 1);
      setTasks([...tasks]);
    })
  };

  return (
    <>
      <div className="navbar bg-blue-200 absolute left-0 top-0">
        <div className="flex-1">
          <h1 className="ml-2 text-gray-900 font-semibold text-xl">Task Keeper</h1>
        </div>
        <div className="flex-none">
          <button onClick={logout} className='text-2xl text-slate-900 mr-10'>Logout</button>
        </div>
      </div>
      <form onSubmit={addTask} className="relative max-w-sm mt-20 flex justify-center items-center mx-auto">
        <input
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          aria-label="disabled input"
          placeholder="Add Task"
          value={todoVal}
          className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button type="submit" className="absolute text-slate-300 btn btn-info left-[104%] top-0 m-0">
          Add
        </button>
      </form>

      <ul className="mt-5">
  {tasks.map((task, index) => (
    <li key={task.id} className="flex justify-between items-center bg-gray-100 border border-gray-300 p-2.5 mb-2.5 rounded-lg">
      {editTaskId === task.id ? (
        <input
          type="text"
          placeholder='Enter a new Value'
          onChange={(e) => setNewTodo(e.target.value)}
          className="border-2 bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      ) : (
        <span>{task.todo}</span>
      )}
      <div>
        {editTaskId === task.id ? (
          <button key={task.id} onClick={() => handleSaveEdit(task, index)} className="text-slate-300 btn btn-info mx-2">
            Save
          </button>
        ) : (
          <button onClick={() => setEditTaskId(task.id, index)} className="text-slate-300 btn btn-info mx-2">
            Edit
          </button>
        )}
        <button onClick={() => handleDelete(task.id, index)} className="text-slate-300 btn btn-danger">
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>
    </>
  );
};

export default Todo;
