import logo from './logo.svg';
import './App.css';
import Router from './routes';
import { Toaster } from 'sonner';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="App">
      <Router />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
