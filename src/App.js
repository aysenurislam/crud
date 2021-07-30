import logo from './logo.svg';
import './App.css';
import ListStudentComponent from './components/ListStudentComponent';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateStudentComponent from './components/CreateStudentComponent';
function App() {
  return (
    <div>
      <Router>
           <HeaderComponent />
            <div className="container">
              <Switch>
                  <Route path="/" exact component={ListStudentComponent}></Route>
                  <Route path="/students" component={ListStudentComponent}></Route>
                  <Route path="/add-student/:id" component={CreateStudentComponent}></Route>
               </Switch>
            </div>
         <FooterComponent />
      </Router>
    </div>

  );
}

export default App;
