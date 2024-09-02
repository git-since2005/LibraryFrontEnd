import {React, useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import Block from './Block'
import UserBlock from './UserBlock'

function LibrarySystem() {
    let book = []
    let member = []
    const [bookName, setBook] = useState('')
    const [show, setShow] = useState(false)
    const [credentials, setCred] = useState({'name':'', 'email':'', 'password':''})
    const [exist, setExist] = useState(false)
    const [color, setColor] = useState('black')
    const nav = useNavigate()

    async function addBook(){
        let response = await fetch('http://localhost:5000/api/books/create',{
            method:"POST",
            headers:{
              'Content-Type':'application/json',
              'Access-Control-Allow-Origin': '*'
          },
            body:JSON.stringify({
                name:bookName
            })
        }).then(async(e)=>{
            const json = e.json()
            setBooks([...books, json])
            window.location.reload('/')
        }).catch((e)=>{
            console.log(e)
        })
    }
    async function allBooks(){
        book =[]
        if(localStorage.getItem('userTk')==undefined){
          nav('./SignUp.js')
        }
          let response = await fetch("http://localhost:5000/api/books/getbooks",{
              method: "POST",
              statusCode: 200,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "auth-token":localStorage.getItem('userTk')
              }
            }
          ).then(async (e) => {
              const json = await e.json();
              for (let index = 0; index < Object.values(json).length; index++) {
                book.push(json[index])
              }
              setShow(true)
            })
            .catch((e) => {
              console.log("Internal error occured!!");
              console.log(e);
            });
    }

    async function allMembers(){
        let response = await fetch('http://localhost:5000/api/auth/getmembers',{
            method:"GET"
        }).then(async(e)=>{
            const json = await e.json()
            for (let i = 0; i < json.length; i++) {
                member.push(json[i]);
            }
        })
    }

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
          window.location.reload('/')
      }
    }

    const onChange = (e)=>{
      setCred({...credentials, [e.target.name]:[e.target.value]})
      if (e.target.name==='password'){
          if (e.target.value.length<9){
              setColor('red')
          }
          else{
              setColor('black')
          }
      }
  }

    if(1){
      allBooks()
      allMembers()
    }

    const [books, setBooks] = useState(book)
    const [members, setMembers] = useState(member)
    return (
      <div className="container">
         <div className="books">
          {show && books.map((i)=>{
              return(
                  <Block key={i._id} i={i} text={{'fonSize':'small', "marginTop":"0px"}} showBorrow={true} style={{"marginBottom":"0px","marginTop":"16px"}}/>
              )
            })}
            <input type="text" name="text" onChange={(e)=>setBook(e.target.value)} value = {bookName} style={{'outline':"none","borderRadius":"3px", "border":"none"}} placeholder="Book name" />
            <button onClick={()=>addBook()}>Add a book</button>
        </div>
        <div className="users" style={{'marginLeft':'none','marginRight':'auto'}}>
          {show && members.map((i)=>{
            return(
                <UserBlock key={i._id} i={i} showBorrow={true} style={{"marginBottom":"0px","marginTop":"8px"}} />
            )
          })}
        <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name" name="name" value={credentials.name} onChange={onChange} />
        <input type="email" name="email"  placeholder = "Email" onChange = {onChange} value={credentials.email} style={{'border':`1px solid ${exist?'red':'black'}`}} onChange={onChange} />
        <label htmlFor="email" style={{'display':`${exist?'block':'none'}`, 'color':'red'}}>Email exists by another user</label>
        <input type="password" className="input" placeholder="Password" value={credentials.pass} name="password" onChange={onChange} />
        <label htmlFor="password" style={{'display':`${color==='red'?'block':'none'}`, 'fontSize':'13px', 'color':'red'}}><br/>Password must not less than 9 characters</label><br />
        <button type="submit">Become Member</button>
        </form>
        </div>
      </div>
    )
}

export default LibrarySystem
