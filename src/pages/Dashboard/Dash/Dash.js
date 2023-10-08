import React, { useEffect, useState } from 'react'
import { UesDoxContext } from '../../Context/DoxContext'
import { useAuthContext } from '../../Context/AuthContext'
import {DeleteOutlined} from '@ant-design/icons'
import { doc , deleteDoc} from "firebase/firestore"
import { message } from 'antd'
import { firestore } from '../../../config/firebase'
import dayjs from 'dayjs'

export default function Dashboard() {
  const { documents } = UesDoxContext()
  const [show, setShow] = useState(true)
  const [date, setDate] = useState("")
  const [todayDoc, setTodayDoc] = useState([])
  const { user } = useAuthContext()

  useEffect(() => {
    let dat = dayjs().format('YYYY-MM-DD')
    setDate(dat)
  }, [documents])


  const handleDelete = async (docId) => {
    // console.log('todo', docume )
    // console.log('doc', doc)

  try {
    await deleteDoc(doc(firestore, "todos", docId));

    message.success("Todo deleted successfully")
  } catch (err) {
    console.error(err)
    message.error("something went wrong while delting todo")
  }
}
  const getFun = () => {
    let today  = []
     today = documents.filter((doc) => {
      if (doc.startDate > date) {
        return doc
      }
    })
    setTodayDoc(today)
    setShow(false)
  }

  useEffect(()=>{
    getFun()
  },[show, documents])
  var no = 1;
  return (
    <>
      <div className="container">
        <div className="row">
        {/* {show ? <button className='btn btn-primary text-white' onClick={getFun} >Show Task</button> : <div></div>} */}
          {
            todayDoc.map((doc, i) => {
              if (user.email === doc.createdBy.email  ){
              return <>

                <div className="col-12 col-md-6 col-lg-4 " >
                  <div className="box my-3 mx-sm-0 mx-md-0 mx-lg-3" style={{ backgroundColor: `${doc.bgColor}`, display: "flex", flexDirection: 'column', position : 'relative' }} >
                    <div className='row'><h3 className='col-10' style={{display: "inline-block"}}>{no++}</h3> <DeleteOutlined className='col-2 mt-2' onClick={() => {handleDelete(doc.randumId)}} style={{fontSize: '20px' , cursor :'pointer'}} /></div>
                    <h4>{doc.title}</h4>
                    <p>{doc.description}</p>
                    {/* <p>Email : {doc.createdBy.email}</p>
                    <p>ID : {doc.randumId}</p>
                    <p>BgColor : {doc.bgColor}</p> */}
                    <p style={{alignSelf : 'end', position : 'absolute' , bottom: "0"}}>{doc.startDate} <b> To </b> {doc.endDate}</p>
                  </div>
                </div>
              </>
              }
            })
          }

        </div>
      </div>
    </>
  )
}
