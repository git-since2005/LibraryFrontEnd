import {React,useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
function SignIn() {
  const [credentials, setCredentials] = useState({'email':'', 'password':''})
    const [exist, setExist] = useState(false)
    const [color, setColor] = useState('black')
    const [match, setMatch] = useState(true)
    const navigate = useNavigate();

    const onSubmit =async (e)=>{
        e.preventDefault()
        
        const response = await fetch("http://localhost:5000/api/auth/member", {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({
                command:'sign',
                email:credentials.email,
                password:credentials.password
            })
        })
        const json = await response.json()
        console.log(json)
        if(json.error !== undefined){
            if(json.error==="Email"){
              setExist(true)
            }
            if(json.error==='Password'){
              setMatch(false)
            }
            e.preventDefault()
        }
        else{
            setExist(false)
            localStorage.setItem('userTk', json.msg)
            navigate('/')
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:[e.target.value]})
    }
  return (
    <div className="signup">
      <form onSubmit={onSubmit}>
        <h1 className = "head">SignIn</h1>
        <input type="email" name="email"  placeholder = "Email" onChange = {onChange} value={credentials.email} style={{'border':`1px solid ${exist?'red':'black'}`}} onChange={onChange} />
        <label htmlFor="email" style={{'display':`${exist?'block':'none'}`, 'color':'red'}}>Email exists by another user</label>
        <input type="password" className="input" placeholder="Password" value={credentials.pass} name="password" onChange={onChange} />
        <label htmlFor="password" style={{'display':`${color==='red'?'block':'none'}`, 'fontSize':'13px', 'color':'red'}}><br/>Password must not less than 9 characters</label>
        <label htmlFor="password" style={{'display':`${match===false?'block':'none'}`, 'fontSize':'13px', 'color':'red'}}><br/>Password is incorrect</label>
        <button type="submit">Become Member</button>
        <Link to='/signup' style={{'color':'white', 'textDecoration':'none', 'marginLeft':'auto', 'marginRight':'auto', 'marginTop':'20px', 'fontSize':'small'}}>I want to SignUp</Link>
        <Link to='/librarian' style={{'color':'white', 'textDecoration':'none', 'marginLeft':'auto', 'marginRight':'auto', 'marginTop':'20px', 'fontSize':'small'}}>I am a Librarian</Link>
      </form>
    </div>
  )
}

export default SignIn
