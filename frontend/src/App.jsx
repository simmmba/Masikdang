import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SurveyProvider } from "./contexts/survey";
import { SearchProvider } from "./contexts/search";
import { WhatToEatProvider } from "./contexts/whatToEat";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./components/routers/Main";
import Home from "./components/routers/Home";
import Login from "./components/routers/Login";
import Signup from "./components/routers/Signup";
import SignupDetail from "./components/routers/SignupDetail";
import Mypage from "./components/routers/Mypage"
import Search from "./components/routers/Search"
import Map from "./components/routers/Map"
import Surveypage from "./components/routers/Surveypage";
import WhatToEatpage from "./components/routers/WhatToEatpage";
import SurveyResult from "./components/survey/SurveyResult";
import WhatToEatResult from "./components/whatToEat/WhatToEatResult";


// Context 갯수가 많아져도 Provider 적용 위해 코드 구조가 깊어질 필요 없음
// context를 props로 전달해주면 됨
const AppProvider = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev,
      }),
    children
  );

const App = () => {
  return (
    <AppProvider contexts={[SurveyProvider, SearchProvider, WhatToEatProvider]}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} exact />
          <Route path="/signup/detail" component={SignupDetail} />
          <Route path="/survey" component={Surveypage} />
          <Route path="/mypage" component={Mypage} />
          <Route path="/search" component={Search} />
          <Route path="/map" component={Map} />
          <Route path="/whatToEat" component={WhatToEatpage} />
          <Route path="/surveyResult" component={SurveyResult} />
          <Route path="/whatToEatResult" component={WhatToEatResult} />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
