import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { useEffect, useState } from 'react';
function App() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [age, setAge] = useState("")
  const link = "http://localhost:3000/room"
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
        age: `${age}`
      }).then(() => {
        getUserPermissions();
        setTitle("");
        setAge("   ");
      })
    }
  }

  async function deleteList(id) {
    console.log(id);
    const response = await axios.delete(`${link}/${id}`);
    console.log("43434", response);
    getUserPermissions();
    return response;
  }


  function editList() {
    console.log("zz");
  }

  function finishList() {
    console.log("zz");
  }

  return (

    <div className='container'>
      <h1> DANH SACH SINH VIEN</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="nhập tên" />
      <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="nhập tuổi" />
      <button className='post' onClick={postList}>post</button>

      <div className='return'>

        <table className='table'>
          <tr className='tr'>
            <th className='th'>stt</th>
            <th className='th'>ten sinh vien</th>
            <th className='th'>tuoi sinh vien</th>
            <th className='th'>trang thai</th>
            <th className='th'>chuc nang</th>
          </tr>
          {
            list.map((e, i) => {
              return (
                <tr className='tr' key={e.id}>
                  <td className='td'>{e.id}</td>
                  <td className='td'>{e.name}</td>
                  <td className='td'>{e.age}</td>
                  {/* <td className='td'>{e.status}</td> */}
                  <td className='td'><button onClick={() => {
                    deleteList(e.id)
                  }} className='delete'>delete</button>
                    <button className="edit" onClick={editList} >edit</button>
                    <button className="finish" onClick={finishList} >finish</button></td>
                </tr>
              )
            })
          }
        </table>
      </div>
    </div>
  );
}

export default App;
