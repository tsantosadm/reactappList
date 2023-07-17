import React, {useState, useEffect} from 'react';

import './styles.css'

import {Card, CardProps} from '../../components/Card';

interface ProfileResponse {
  name: string;
  avatar_url: string; 
}
interface User {
  name: string;
  avatar: string;
}


export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User)

  function handlNewStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString(
        'pt-br',{
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }
      )
    }
    setStudents(prevState => [...prevState, newStudent]);
  }
 
  // useEffect(() => {
  //   //corpo do useEffect - executa automatico logo que a interface renderiza
  //   fetch('https://api.github.com/users/tsantosadm')
  //   .then(response => response.json())
  //   .then(data => {
  //     setUser ({
  //       name: data.name,
  //       avatar: data.avatar_url
  //     })
  //     console.log(data,'EITAA')
  //   })
  //   .catch(error => console.error(error))
  // },[students])

  // COM ASYNC
  useEffect(() => {
    //corpo do useEffect - executa automatico logo que a interface renderiza
    async function fetchData(){
      const response =  await fetch('https://api.github.com/users/tsantosadm');
      const data = await response.json() as ProfileResponse;
      console.log('Dados ==>', data);

      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }
    fetchData();
  },[])

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} 
          alt='Foto Perfil'
          />
        </div>
      </header>
      <input 
        type= 'text' 
        placeholder='Digite o nome...' 
        onChange={e => setStudentName(e.target.value)}
      />
      <button onClick={handlNewStudent}>
        Adicionar
      </button>
        { students.map(student => 
          <Card 
          key={student.time}
          name={student.name} 
          time={student.time}/>
          )
        }
    </div>
  )
}
