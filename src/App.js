
import './App.css';
import { Route,Routes } from 'react-router-dom';
import { HomePage,TaskDetailPage,TaskPage } from './components';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/tasks" element={<TaskPage/>}/>
        <Route path="/tasks/:taskId" element={<TaskDetailPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
