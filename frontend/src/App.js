import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Helmet} from "react-helmet";
import Main from './components/main.js';
import Country from './components/country.js';
import routes from './config/routes';

function App() {
  return (
    <>
    <Helmet>
      <title>RestCountries</title>
    </Helmet>
    <Router>
      <Route path={routes.homePage} exact component={Main}></Route>
      <Route path="/country/:country"  component={Country}></Route>
    </Router>
    </>
  );
}

export default App;
