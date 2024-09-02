import React,{useState} from 'react'

function UserBlock(props) {

    const [name, setName] = useState(props.i.name)
    const [email, setEmail] = useState(props.i.email)
    const [change, setChange] = useState(true)

    async function userUpdate(idd){
        let response = await fetch('http://localhost:5000/api/auth/update',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({
                email:email,
                name:name,
                id:idd
            })
        }).then(async(e)=>{
          const json = await e.json()
            console.log(json)
          window.location.reload('/')
        })
    }

    async function userDelete(idd){
        let response = await fetch('http://localhost:5000/api/auth/delete/'+idd,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            }
        }).then(async(e)=>{
          const json = await e.json()
            console.log(json)
          window.location.reload('/')
        })
    }

  return (
    <div className="container">
        <div className="user" key = {props.i._id}>
            <div className="info">
                {change && <p className="title" style={props.style}>{props.i.name}</p>}
                {!change && <input type="text" style={props.style} value={name} onChange={(e)=>{setName(e.target.value)}} />}
                {change && <p className="title" style={props.style}>{props.i.email}</p>}
                {!change && <input type="text" style={props.style} value={email} onChange={(e)=>{setName(e.target.value)}} />}
            </div>
            <div className="options">
                {change && <button onClick={()=>{setChange(false)}}>Update</button>}
                {!change && <button onClick={()=>{userUpdate(props.i._id);setChange(true)}}>Update</button>}
                  <button onClick={()=>{userDelete(props.i._id)}}>Remove</button>
            </div>

        </div>
    </div>
  )
}

export default UserBlock
