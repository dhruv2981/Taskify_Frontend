import React from 'react';
import Oauth from './pages/Oauth';
import ListProjectComponent from './pages/Dashboard';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OauthJump from './pages/OauthJump';



// import './App.css';
// import { InputField } from './components/InputField';
// import {Todo} from './models'



// const App:React.FC =()=>{

//   const [todo, setTodo] = useState<string>("");
//   const [todos,setTodos]=useState<Todo[]>([]);
 

//   const handleAdd=(e:React.FormEvent)=>{
//     e.preventDefault();
//     if(todo){
//       setTodos([...todos,{id:Date.now(),todo,isDone:false}]);
//       setTodo("");
//     }
//   }
//    console.log(todos);

//   return (
//     <div className="App">
//      <span className="heading">Taskify</span>
//      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
//     </div>
//   );
// }

// export default App;



function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Oauth />} />
          <Route path="oauth/jump/" element={<OauthJump />} />
          <Route path="dashboard/" element={<ListProjectComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  ); 
}
export default App;


