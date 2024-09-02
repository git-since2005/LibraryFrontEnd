import {React, useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'

function Librarian() {
    const [credentials, setCredentials] = useState({uname:'', password:''})
    const [matchu, setMatchu] = useState(false)
    const [match, setMatch] = useState(false)
    const [color, setColor] = useState('black')
    const navigate = useNavigate();
    const onSubmit =async (e)=>{
        e.preventDefault()
        console.log(localStorage.getItem('token'))
        const response = await fetch("http://localhost:5000/api/auth/librariansign", {
            method:'POST',
            headers:{
                "auth-token":localStorage.getItem('token'),
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({
                uname:credentials.uname,
                password:credentials.password
            })
        })
        const json = await response.json()
        console.log(json)
        if(json.error !== undefined){
            if(json.error==="N"){
              setMatchu(true)
            }
            if(json.error==='P'){
              setMatch(false)
            }
            e.preventDefault()
        }
        else{
            localStorage.setItem('token', json.msg)
            navigate('/LibrarySystem')
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:[e.target.value]})
    }
  return (
    <div className="signup" style={{'height':'330px'}}>
      <form onSubmit={onSubmit}>
        <h1 className="head">Librarian Log in</h1>
        <input type="text" name="username" name="uname" placeholder = "username" value = {credentials.uname} onChange = {onChange} />
        <label htmlFor="uname" style={{'display':`${matchu?'block':'none'}`, 'color':'red'}}>Username is invalid!!!</label>
        <input type="password" name="password" placeholder="password" value={credentials.password} onChange = {onChange} />
        <label htmlFor="password" style={{'display':`${match?'block':'none'}`, 'color':'red'}}>Invalid password!!!</label>
        <button type="submit">Show Library System</button>
        <Link to='/signin' style={{'color':'white', 'textDecoration':'none', 'marginLeft':'auto', 'marginRight':'auto', 'marginTop':'20px', 'fontSize':'small'}}>I am a Member</Link>
      </form>
    </div>
  )
}

export default Librarian