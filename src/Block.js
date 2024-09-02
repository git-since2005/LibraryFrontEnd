import React, {useState} from 'react'

function Block(props) {
    const [change, setChange] = useState(true)
    const [name, setName] = useState(props.i.name)
    let book = []
    async function bookUpdate(idd){
      console.log(localStorage.getItem('token'))
        let response = await fetch('http://localhost:5000/api/books/update',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({
                name:name,
                id:idd
            })
        }).then(async(e)=>{
          const json = await e.json()

          window.location.reload('/')
        })
    }

    async function deleteBook(idd){
      let response = await fetch('http://localhost:5000/api/books/delete/'+idd,{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
          "auth-token":localStorage.getItem('token')
        }
      }).then(async(e)=>{
        const json = await e.json()
        console.log(json)
        window.location.reload('/')
      })
    }
  return (
    <div className="book" key = {props.i._id}>
            <div className="info">
              {change && <p className="title" style={props.style}>{props.i.name}</p>}
              {!change && <input type="text" style={props.style} value={name} onChange={(e)=>{setName(e.target.value)}} />}
              {/* {!change && <input type="text" style={props.stl} />} */}
              {props.showBorrow && <p className="status" style={props.text}>{props.i.borrower!=='null'?'borrowed':'Not borrowed'}</p>}
            </div>
            <div className="options">
              {change && <button onClick={()=>{setChange(false)}}>Update</button>}
              {!change && <button onClick={()=>{bookUpdate(props.i._id);setChange(true)}}>Update</button>}
              <button onClick={()=>{deleteBook(props.i._id)}}>Remove</button>
            </div>
        </div>
  )
}

export default Block
