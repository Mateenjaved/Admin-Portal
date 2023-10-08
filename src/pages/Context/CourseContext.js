import React, { createContext, useContext, useEffect, useState } from 'react'
import { collection, getDocs, where, query } from 'firebase/firestore';
import { firestore } from '../../config/firebase'
import { useAuthContext } from '../Context/AuthContext'
const CourseContext = createContext()
export default function CourseContextProvider(props) {
    const [Courses, setCourses] = useState([])
    // const { user } = useAuthContext()
// -------------------------------- get task doc ------------------

// useEffect(() => {
//     fatchDoc()
//   }, [Courses])

//   const fatchDoc = async () => {
//     const querySnapshot = await getDocs(collection(firestore, "courses"), where(""));
//     const array = []
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       let data = doc.data()
//       array.push(data)
//     });
//     setCourses(array)
//   }
//   console.log('Courses', Courses)
//   useEffect(() => {
//     fatchDoc()
//   }, [Courses])


const getTodos = async () => {

    const q = query(collection(firestore, "Courses"))

    const querySnapshot = await getDocs(q);
    const array = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let data = doc.data()
      array.push(data)
    });
    setCourses(array)
  }
  

  useEffect(() => {
    getTodos()
  }, [Courses])

    return (
        <CourseContext.Provider value={{ Courses, setCourses }}>
            {props.children}
        </CourseContext.Provider>
    )
}

export const UseCourseContext=()=> useContext(CourseContext)