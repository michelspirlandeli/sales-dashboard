import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import Sellers from "pages/Sellers";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/sellers">
          <Sellers />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
