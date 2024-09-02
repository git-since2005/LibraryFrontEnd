import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'

function LibrarianSignUp() {
    const [credentials, setCredentials] = useState({'name':'', 'password':''})
    const [color, setColor] = useState('black')
    const navigate = useNavigate()

    const onSubmit =async (e)=>{
        e.preventDefault()
        
        const response = await fetch("http://localhost:5000/api/auth/librarian", {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({
                uname:credentials.name,
                password:credentials.password
            })
        }).then(async(e)=>{
            const json = await e.json()
            console.log(json)
            if(json.error !== undefined){
                console.log(json)
                e.preventDefault()
            }
            else{
                console.log(json.msg)
                localStorage.setItem('token', json.msg)
                // navigate('/LibrarySystem')
            }
        })
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
        <h1 className = "head">Librarian SignUp</h1>
        <input type="text" placeholder="Name" name="name" value={credentials.name} onChange={onChange} />
        <input type="password" className="input" placeholder="Password" value={credentials.pass} name="password" onChange={onChange} />
        <label htmlFor="password" style={{'display':`${color==='red'?'block':'none'}`, 'fontSize':'13px', 'color':'red'}}><br/>Password must not less than 9 characters</label>
        <button type="submit">Become Librarian</button>
        <Link to='/signin' style={{'color':'white', 'textDecoration':'none', 'marginLeft':'auto', 'marginRight':'auto', 'marginTop':'10px', 'fontSize':'small'}}>I am a member</Link>
        <Link to='/librarian' style={{'color':'white', 'textDecoration':'none', 'marginLeft':'auto', 'marginRight':'auto', 'marginTop':'10px', 'fontSize':'small'}}>I am a Librarian</Link>
      </form>
    </div>
    </>
  )
}

export default LibrarianSignUp
