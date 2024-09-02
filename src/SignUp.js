import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'

function SignUp() {
    const [credentials, setCredentials] = useState({'name':'', 'email':'', 'password':''})
    const [exist, setExist] = useState(false)
    const [color, setColor] = useState('black')
    const navigate = useNavigate()

    const onSubmit =async (e)=>{
        e.preventDefault()
        
        const response = await fetch("http://localhost:5000/api/auth/member", {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({
                command:'create',
                name:credentials.name,
                email:credentials.email,
                password:credentials.password
            })
        })
        const json = await response.json()
        console.log(json)
        if(json.error !== undefined){
            console.log(json)
            setExist(true)
            e.preventDefault()
        }
        else{
            setExist(false)
            localStorage.setItem('token', json.authtoken)
            navigate('/')
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:[e.target.value]})
        if (e.target.name==='password'){
            if (e.target.value.length<9){
                setColor('red')
            }
            else{
                setColor('black')
            }
        }
    }
    
  return (
    <>
    <div className="signup" style={{'height':'370px'}}>
      <form onSubmit={onSubmit}>
        <h1 className = "head">SignUp</h1>
        <input type="text" placeholder="Name" name="name" value={credentials.name} onChange={onChange} />
        <input type="email" name="email"  placeholder = "Email" onChange = {onChange} value={credentials.email} style={{'border':`1px solid ${exist?'red':'black'}`}} onChange={onChange} />
        <label htmlFor="email" style={{'display':`${exist?'block':'none'}`, 'color':'red'}}>Email exists by another user</label>
        <input type="password" className="input" placeholder="Password" value={credentials.pass} name="password" onChange={onChange} />
        <label htmlFor="password" style={{'display':`${color==='red'?'block':'none'}`, 'fontSize':'13px', 'color':'red'}}><br/>Password must not less than 9 characters</label>
        <button type="submit">Become Member</button>
        <Link to='/signin' style={{'color':'white', 'textDecoration':'none', 'marginLeft':'auto', 'marginRight':'auto', 'marginTop':'10px', 'fontSize':'small'}}>Already a member!😇</Link>
        <Link to='/librarian' style={{'color':'white', 'textDecoration':'none', 'marginLeft':'auto', 'marginRight':'auto', 'marginTop':'10px', 'fontSize':'small'}}>I am a Librarian</Link>
      </form>
    </div>
    </>
  )
}

export default SignUp
