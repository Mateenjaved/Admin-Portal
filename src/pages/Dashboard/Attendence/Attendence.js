
// import React, { useEffect, useState } from 'react'
// import { Modal } from 'antd';
// import { DatePicker, Space, Select, message } from 'antd'
// import { DeleteOutlined } from '@ant-design/icons'
// import { useAuthContext } from '../../Context/AuthContext'
// import { firestore } from '../../../config/firebase';
// import { doc, collection, serverTimestamp, setDoc , deleteDoc } from 'firebase/firestore';
// import { UesDoxContext } from '../../Context/DoxContext';

// import dayjs from 'dayjs'
// const initialdate = { startDate: "", endDate: "" };
// const initialState = { title: "", description: "" };
// const colorArr = ["#FDF2B3", "#D1EAED", "#FFDADA", "#FFD4A9", "#f5ebe0", "#b8dbd9", "#FDF2B3", "#b7e4c7"]
// const { RangePicker } = DatePicker;


// export default function Attendence() {
//   const { documents } = UesDoxContext()
  
  
//   const handleDelete = async (docId) => {
//     // console.log('todo', docume )
//     // console.log('doc', doc)

//   try {
//     await deleteDoc(doc(firestore, "todos", docId));

//     message.success("Todo deleted successfully")
//   } catch (err) {
//     console.error(err)
//     message.error("something went wrong while delting todo")
//   }
// }


//   const [open, setOpen] = useState(false);
//   const [state, setState] = useState(initialState)
//   const { user } = useAuthContext()
//   const [confirmLoading, setConfirmLoading] = useState(false);

//   // --------------------- handle date ------------------
//   const [date, setDate] = useState([]);
//   const [objdate, setObjDate] = useState(initialdate);
//   const handleDate = (_, dateString) => {
//     setDate(dateString)

//   }
//   // -------------------------handle date end

//   const handleChange = (e) => {
//     setState(s => ({ ...s, [e.target.name]: e.target.value }))
//   }
//   // ---------------------- add task modle -------------------
//   const showModal = () => {
//     setOpen(true);
//   };

//   const handleCancel = () => {

//     window.notify("You Cancel the task", "info")
//     setOpen(false);
//   };

//   const handleOk = async () => {
//     let { title, description } = state
//     let todo = { title, description }
//     let { startDate, endDate } = objdate
//     startDate = date[0]
//     endDate = date[1]
//     todo.startDate = startDate
//     todo.endDate = endDate
//     todo.randumId = Math.random().toString(36).slice(2)
//     todo.bgColor = colorArr[Math.floor(Math.random() * (7 + 1))]
//     todo.dateCreated = new Date().getTime()
//     todo.createdBy = {
//       email: user.email,
//       uid: user.uid,
//     }
//     if (title.length < 3) {
//       return window.notify("Plz enter title!", "info")
//     }
//     if (description.length < 10) {
//       return window.notify("Plz enter description!", "info")
//     }
//     setConfirmLoading(true);
//     try {
//       await setDoc(doc(firestore, "todos", todo.randumId), todo);
//       setConfirmLoading(false);
//       setOpen(false);
//       window.notify("Add Task Successuly", "success")
//     } catch (err) {
//       window.notify("Task is not added", "error")

//     }
//     setState(initialState)
//     setObjDate(initialState)
//     setDate([])
//   };

//   var no = 1;

//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           {
//             documents.map((doc) => {
//               if (user.email === doc.createdBy.email) {
//                 return <>
//                   <div className="col-12 col-md-6 col-lg-4 " >
//                     <div className="box my-3 mx-sm-0 mx-md-0 mx-lg-3" style={{ backgroundColor: `${doc.bgColor}`, display: "flex", flexDirection: 'column', position: 'relative' }} >
//                       <div className='row'><h3 className='col-10' style={{ display: "inline-block" }}>{no++}</h3> <DeleteOutlined className='col-2 mt-2' onClick={() => {handleDelete(doc.randumId)}} style={{ fontSize: '20px', cursor: 'pointer' }} /></div>
//                       <h4>{doc.title}</h4>
//                       <p>{doc.description}</p>
//                       {/* <p>Email : {doc.createdBy.email}</p>
//                       <p>ID : {doc.randumId}</p>
//                       <p>BgColor : {doc.bgColor}</p> */}
//                       <p style={{ alignSelf: 'end', position: 'absolute', bottom: "0" }}>{doc.startDate} <b> To </b> {doc.endDate}</p>
//                     </div>
//                   </div>
//                 </>
//               }
//             })
//           }

//           <div className="col-12 col-md-6 col-lg-4">
//             <div className="box1 my-3 mx-sm-0 mx-md-0 mx-lg-3" onClick={showModal}>
//               <a className='Plus nav-link'>+</a>
//             </div>
//           </div>
//         </div>
//       </div>


//       {/* --------------- Modal --------------- */}
//       <Modal
//         title="Title"
//         open={open}
//         onOk={handleOk}
//         confirmLoading={confirmLoading}
//         onCancel={handleCancel}
//       >
//         <div className="row">
//           <div className="col">
//             <label htmlFor="title" className='fw-bold'>title</label> <br />
//             <input type="text" placeholder='Enter title' id='title' className='w-50 form-control' value={state.title} name='title' onChange={handleChange} /><br />
//             <label htmlFor="title" className='fw-bold'>Select an List</label> <br />
//             <Select
//               showSearch
//               placeholder="Select a person"
//               optionFilterProp="children"
//               filterOption={(input, option) =>
//                 (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
//               }
//               options={[
//                 {
//                   value: 'Personnel',
//                   label: 'Personnel',
//                 },
//                 {
//                   value: 'Work',
//                   label: 'Work',
//                 },
//                 {
//                   value: 'List 1',
//                   label: 'List 1',
//                 },
//               ]}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col">
//             <label htmlFor="floatingTextarea2" className='fw-bold'>Description</label> <br />
//             <div className="form-floating">
//               <textarea className="form-control" id="floatingTextarea2" style={{ height: "100px" }} name='description' value={state.description} onChange={handleChange}></textarea>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col mt-3">
//             <label className='fw-bold '>Select Date</label> <br />
//             <Space direction="vertical" size={12}>
//               <RangePicker
//                 onChange={handleDate}

//               />
//             </Space>
//           </div>
//         </div>
//       </Modal>

//     </>
//   )

// }


import React from 'react'
import { UseCourseContext } from '../../Context/CourseContext'

export default function Attendence() {
  const {Courses} = UseCourseContext()
console.log(Courses)
  return (
    <>
    <div className="row">
              <div className="col">
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th>#</th>
                        {/* <th>Phot</th> */}
                        <th>Course Name</th>
                        {/* <th>Address</th> */}
                        <th>Course Duration</th>
                        <th>Start Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Courses.map((todo, i) => {
                        return (
                          <tr key={i}>
                            <th>{i + 1}</th>
                            {/* <td>{todo.file ? <Image src={todo.file} className='rounded-circle' style={{ width: 50 }} /> : <Avatar size={50} icon={<UserOutlined />} />}</td> */}
                            <td>{todo.title}</td>
                            <td>{todo.location}</td>
                            {/* <td>{todo.description}</td> */}
                            {/* <td>{todo.date ? dayjs(todo.date).format("dddd, DD/MM/YYYY") : ""}</td> */}
                            <td>
                              {/* <Space>
                                <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => { handleDelete(todo) }} /></Tooltip>
                              </Space> */}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
    </>
    
  )
}


