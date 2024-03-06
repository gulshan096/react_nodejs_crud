import AllRoutes from './AllRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <div className="App">
      <AllRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
