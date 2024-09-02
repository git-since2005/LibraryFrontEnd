import {React, useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import './App.css'

function User() {
  let book = []
  let borrow = []
  const [show, setShow] = useState(false)
  const nav = useNavigate()
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

  async function fetchBorrowed(idd){
    let response = await fetch("http://localhost:5000/api/books/borrowed/"+idd,{
      method:"POST"
    }).then(async(e)=>{
      const json = await e.json()
      for (let i = 0; i < json.length; i++) {
        borrow.push(json[i]);
      }
    })
  }
  async function onBorrow(idd){
    borrow = []
    let command = "changeBorrow"
    let response = await fetch("http://localhost:5000/api/books/borrow/"+idd+"/"+localStorage.getItem('userTk'),{
      method:"POST"
    })
    .then((e)=>{
      const json = e.json()
      for (let i = 0; i < json.length; i++) {
        borrow.push(json[i]);
      }
      setBorrow(borrow)
      allBooks()
      window.location.reload('/')
    })
    .catch((e)=>{
      console.log(e)
    })
  }
  async function toReturn(idd){
    let response = await fetch("http://localhost:5000/api/books/return/"+idd+"/"+localStorage.getItem('userTk'),{
      method:"POST"
    }).then(async(e)=>{
      const json = await e.json()
      for (let i = 0; i < json.length; i++) {
        borrow.push(json[i]);
      }
      window.location.reload('/')
    })
  }

  
  if(1){
    allBooks()
    fetchBorrowed(localStorage.getItem('userTk'))
  }
  const [books, setBooks] = useState(book)
  const [borrowed, setBorrow] = useState(borrow)
  return (
    <div className="container">
      <div className="books">
        {show && books.map((i)=>{
            return(
                <div className="book" key = {i._id}>
                    <div className="info">
                      <p className="title">{i.name}</p>
                      <p className="status" style={{'fonSize':'small'}}>{i.borrower!=='null'?'borrowed':'Not borrowed'}</p>
                    </div>
                    <div className="options">
                      <button onClick={async()=>{await onBorrow(i._id)}}>Borrow</button>
                    </div>
                </div>
            )
        })}
      </div>
      <div className="borrowed">
        {borrowed.map((i)=>{
          console.log(i._id)
          return(<div className="borrow" key={i._id}>
            <p className="Name">{i.name}</p>
            <button onClick={()=>toReturn(i._id)}>Return</button>
          </div>)
        })}
      </div>
    </div>
  )
}

export default User