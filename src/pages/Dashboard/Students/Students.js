import React, { useEffect, useState } from 'react'
import { Avatar, Button, Col, DatePicker, Divider, Form, Image, Input, Modal, Row, Select, Space, Tooltip, message } from 'antd'
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { firestore, storage } from '../../../config/firebase'
import { useAuthContext } from '../../Context/AuthContext'
import { UseCourseContext } from '../../Context/CourseContext'

// import React, { useState } from 'react'
import { Progress, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { setDoc } from "firebase/firestore";
// import { firestore, storage } from 'config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useAuthContext } from 'contexts/AuthContext';



export default function Students() {
  
  const { user } = useAuthContext()
  const [allDocuments, setAllDocuments] = useState([])
  const [documents, setDocuments] = useState([])
  const [status, SetStatus] = useState("active")
  const [todo, setTodo] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {Courses} = UseCourseContext()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleDate = (_, date) => setState(s => ({ ...s, date }))

  const getTodos = async () => {

    const q = query(collection(firestore, "Students"), where("createdBy.uid", "==", user.uid))

    const querySnapshot = await getDocs(q);
    const array = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let data = doc.data()
      array.push(data)
    });
    setAllDocuments(array)
    setDocuments(array)
  }

  useEffect(() => {
    getTodos()
  }, [documents])


  const initialState = { title: "", location: "", date: "", description: "" }

  const [state, setState] = useState(initialState)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('state', state)
    let { title, location, date, description } = state

    if (!title) { return message.error("Please enter title") }

    const todo = {
      title, location, date, description,
      dateCreated: new Date().getTime(),
      id: Math.random().toString(36).slice(2),
      file: "",
      createdBy: {
        // fullName: user.fullName,
        email: user.email,
        uid: user.uid,
      }
    }

    console.log('todo', todo)

    setIsProcessing(true)

    if (file) {
      uploadFile(todo)
    } else {
      createDocument(todo)
    }
  }

  const createDocument = async (todo) => {
    try {
      await setDoc(doc(firestore, "Students", todo.id), todo);
      console.log('todo.id', todo.id)
      message.success("A new todo added successfully")
      setIsModalOpen(false)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setIsProcessing(false)
  }

  const uploadFile = (todo) => {

    const fileName = todo.id
    var fileExtension = file.name.split('.').pop();

    const storageRef = ref(storage, `images/${fileName}.${fileExtension}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.floor(progress))
      },
      (error) => {
        message.error("Something went wrong while uploading file")
        // Handle unsuccessful uploads
        setIsProcessing(false)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          let data = { ...todo, file: downloadURL }
          createDocument(data)
        });
      }
    );

  }


  const handleDelete = async (todo) => {

    try {
      await deleteDoc(doc(firestore, "Students", todo.id));

      let documentsAfterDelete = documents.filter(doc => doc.id !== todo.id)
      setAllDocuments(documentsAfterDelete)
      setDocuments(documentsAfterDelete)

      message.success("Todo deleted successfully")
    } catch (err) {
      console.error(err)
      message.error("something went wrong while delting todo")
    }
  }

  return (
    <>
      <div className='py-4'>
        <div className="container">
          <div className="row ">
            <h1>Students:</h1>
            <div className='col-12 text-end'>
              <Link onClick={() => { setIsModalOpen(true) }} className='btn btn-primary mb-5'>Add Student</Link>
            </div>
          </div>
          <Divider />

          <div className="row">
            <div className="col">
              <div className="table-responsive">
                <table className="table table-striped align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Course</th>
                      <th>Date of Joining</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((todo, i) => {
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{todo.file ? <Image src={todo.file} className='rounded-circle' style={{ width: 50 }} /> : <Avatar size={50} icon={<UserOutlined />} />}</td>
                          <td>{todo.title}</td>
                          <td>{todo.location}</td>
                          <td>{todo.description}</td>
                          <td>{todo.date ? dayjs(todo.date).format("dddd, DD/MM/YYYY") : ""}</td>
                          <td>
                            <Space>
                              <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => { handleDelete(todo) }} /></Tooltip>
                            </Space>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">

            <Divider />
            <Modal
              title="Add Student"
              centered
              open={isModalOpen}
              onOk={handleSubmit}
              okText="Confirm"
              cancelText="Close"
              onCancel={() => setIsModalOpen(false)}
              style={{ width: 1000, maxWidth: 1000 }}>
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Title">
                      <Input placeholder='Input your Name' name='title' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Location">
                      <Input placeholder='Input your Adress' name='location' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Date">
                      <DatePicker className='w-100' onChange={handleDate} />
                    </Form.Item>
                  </Col>
                  <Col xs={12} lg={8}>
                    <Form.Item label="Image">
                      <Input type='file' placeholder='Upload picture' onChange={e => { setFile(e.target.files[0]) }} />
                    </Form.Item>
                    {isProcessing && file && <Progress percent={progress} showInfo={false} />}
                  </Col>
                  <Col xs={12} lg={4}>
                    <Form.Item label="Preview">
                      {file && <Image src={URL.createObjectURL(file)} style={{ width: 50, height: 50 }} />}
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    {/* <Form.Item label="Description">
                      <Input.TextArea placeholder='Input your description' name='description' onChange={handleChange} />
                    </Form.Item> */}
                    {}

                  </Col>
                </Row>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}
