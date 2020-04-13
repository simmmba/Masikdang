import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SurveyProvider } from "./contexts/survey";
import "./App.scss";

import Main from "./components/routers/Main";
import Home from "./components/routers/Home";
import Login from "./components/routers/Login";
import Signup from "./components/routers/Signup";
import SignupDetail from "./components/routers/SignupDetail";
import Surveypage from "./components/survey/Surveypage";
import Result from "./components/survey/Result";

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
    <AppProvider contexts={[SurveyProvider]}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} exact />
          <Route path="/signup/detail" component={SignupDetail} />
          <Route path="/survey" component={Surveypage} />
          <Route path="/result" component={Result} />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
