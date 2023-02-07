const [list, setList] = useState([]);
useEffect(() => {
  fetch("http://localhost:3000/room")
    .then((res) => res.json())
    .then((data) => setList(data))
}, [])
console.log(list);