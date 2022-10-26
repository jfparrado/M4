import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import CreateRecipes from "./components/CreateRecipes/CreateRecipes";
import DetailRecipe from "./components/DetailRecipe/DetailRecipe";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/">
          <NavBar />
        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/home">
          <Home info="aca va la info" />
        </Route>
        <Route path="/home/:id">
          <DetailRecipe />
        </Route>
        <Route path="/create_recipes">
          <CreateRecipes />
        </Route>
        {/* <Route path="*">
          <PageNotFound />
        </Route> */}
      </Router>
    </div>
  );
}

export default App;
