import logo from './logo.svg';
import './App.css';
import ChatWrapper from "./components/chat/ChatWrapper";

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

function App() {



  return (
    <div className="App">
      <ChatWrapper/>
        <ToastContainer />
    </div>
  );
}

export default App;
