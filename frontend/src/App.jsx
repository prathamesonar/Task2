import React,{useState,useEffect} from 'react';
function App(){
  const [todo,settodo] = useState([]);
  const [title, settitle]=useState("");

  useEffect(()=>{load();},[]);
  function load(){fetch("http://localhost:5200/api/todo").then(res=>res.json()).then(data=>settodo(data));}
  
  function addtodo() {
    if(title==="")return;
    fetch("http://localhost:5200/api/todo",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({title})
    }).then(()=>{
      settitle("");
      load();
    });
  }
  function deletetodo(id){fetch(`http://localhost:5200/api/todo/${id}`,{
      method:"DELETE"
    }).then(()=>load());
  }

  function toggle(todo){
    fetch(`http://localhost:5200/api/todo/${todo.id}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        title:todo.title,
        isCompleted:!todo.isCompleted
      })
    }).then(()=>load());
  }

  return (
    <>
     <p>todo list</p>
     <input type="text" value={title} onChange={(e)=>settitle(e.target.value)}/>
     <button onClick={addtodo}>add todo</button>
     {todo.map(to=>(
        <div key={to.id} style={{display:"flex",flexDirection:"row"}}>
          <p style={{textDecoration:to.isCompleted ?"line-through":"none",cursor:"pointer"}} onClick={()=>toggle(to)}>{to.title}</p>
          <button onClick={()=>deletetodo(to.id)}>delete</button>
        </div>
      ))}
    </>
  )
}

export default App
