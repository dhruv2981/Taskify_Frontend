import React from 'react'
import "./InputField.css"

interface Prop {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}

export const InputField:React.FC<Prop> = ({todo,setTodo}:Prop) => {
  return (
    <div>
        <form className='input'>
            <input type='input' placeholder='Enter ur input' className='input_field'></input>
            <button className='input_submit' type='submit'>Go</button>
        </form>
    </div>
  )
}