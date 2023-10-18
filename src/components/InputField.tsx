import React from 'react'
import "taskify_frontend/src/assets/css/InputField.css";

interface Prop {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd:(e:React.FormEvent)=>void;
}

export const InputField:React.FC<Prop> = ({todo,setTodo,handleAdd}:Prop) => {
  return (
    <div>
        <form 
            onSubmit={handleAdd}
            className='input'>
            <input type='input' value={todo}
            onChange={
                (e)=>setTodo(e.target.value)
            } 
            placeholder='Enter ur input' 
            className='input_field'></input>
            <button className='input_submit' type='submit'>Go</button>
        </form>
    </div>
  )
}