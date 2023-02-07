
import './App.css';
import axios from "axios"
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function App() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [age, setAge] = useState("")
  const link = "http://localhost:3000/room"
  const [nameValue, setNameValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [idUpdate,setIdUpdate]  = useState('');
  const [valuePayment,setValuePayment]  = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    getUserPermissions();
  }, [])

  function getUserPermissions() {
    axios.get(link).then((res) => {
      setList(res.data);
    })
  }

  function postList() {
    if (title == "" || age == "") {
      alert("bạn chưa điền đầy đủ thông tin !")
    } else {
      axios.post(link, {
        name: `${title}`,
        age: `${age}`,
        payment:"unpaid"
      }).then(() => {
        getUserPermissions();
        setTitle("");
        setAge("");
      })
    }
  }

  async function deleteList(id) {
   await axios.delete(`${link}/${id}`);
    getUserPermissions();
   
  }

  function editList(id) {
    setShow(true);
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          setNameValue(list[i].name);
          setAgeValue(list[i].age);
          setIdUpdate(id);
          setValuePayment(list[i].payment)
        }
      }
  }

  function changePayment(idChangePayment) {
    console.log("444444",idChangePayment);
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == idChangePayment) {
            if(list[i].payment=="unpaid"){
              axios.put(`${link}/${idChangePayment}`, {
                name: `${list[i].name}`,
                age: `${list[i].age}`,
                payment:"paid"
              })
              .then(() => {
                getUserPermissions();
               
              })
            }else{
              axios.put(`${link}/${idChangePayment}`, {
                name: `${list[i].name}`,
                age: `${list[i].age}`,
                payment:"unpaid"
              })
              .then(() => {
                getUserPermissions();     
              })
            }
      }
    }
  }
  async function handleCloseTab(idUpdate){
    console.log("5454545",idUpdate);
    axios.put(`${link}/${idUpdate}`, {
      name: `${nameValue}`,
      age: `${ageValue}`,
      payment:`${valuePayment}`
    })
    .then(() => {
      getUserPermissions();
     
    })
    handleClose();
  }

  return (
    <div className='container'>
      <h1> DANH SACH SINH VIEN</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="nhập tên" />
      <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="nhập tuổi" />
      <button className='post' onClick={postList}>post</button>

      <div className='return' style={{margin:" auto",marginTop:"20px"}}>

        <table className='table'>
          <thead>
          <tr className='tr'>
            <th className='th'>stt</th>
            <th className='th'>tên sinh viên </th>
            <th className='th'>tuổi sinh viên </th>
            <th className='th'>thanh toán</th>
            <th className='th'> chức năng </th>
          </tr>
          </thead>
          {
            list.map((e, i) => {
              return (
                <tbody key={e.id}>
                  <tr className='tr' >
                  <td className='td'>{e.id}</td>
                  <td className='td'>{e.name}</td>
                  <td className='td'>{e.age}</td>
                  <td className='td'>{e.payment}</td>
                  <td className='td'><button onClick={() => {
                    deleteList(e.id)
                  }} className='delete'>delete</button>
                    <button className="edit" onClick={() => {
                      editList(e.id)
                    }} >edit</button>
                    <button className="finish" onClick={()=>{
                      changePayment(e.id)
                    }} >finish</button></td>
                </tr>
                </tbody>
              )
            })
          }
        </table>
      </div>

      {/* Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input placeholder='nhập tên'
            value={nameValue}
            onChange={(e) =>
              setNameValue(e.target.value)
            }
          >
          </input>  <br /><br />
          <input placeholder='nhập tuổi' value={ageValue}
            onChange={(e) => {
              setAgeValue(e.target.value)
            }}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            handleCloseTab(idUpdate)
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
