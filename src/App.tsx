import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useSelector, useDispatch } from "react-redux";
import { setIsAuthed } from "./redux/authSlice";
import Home from "./pages/Home";
import ViewMessage from "./pages/ViewMessage";
import Login from "./pages/SignIn";
import SignUp from "./pages/SignUp";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useEffect } from "react";
import { now } from "@ionic/core/dist/types/utils/helpers";
import { RootState } from "./redux/store";
setupIonicReact();

//render redirect route if false

const App: React.FC = () => {

  const { isAuthed } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  const isAuthenticated = () => {
    const now = new Date();
    if (now.getTime() > isAuthed.expires) {
      console.log(isAuthed);
      localStorage.removeItem("authed");
      return false;
    }
    return true;
  };

  useEffect(() => {
    const now = new Date();
    const object = {
      "data": {
        "login": {
          "user": {
            "_id": "6247d31f2b0d7154f3b03602",
            "name": "bertho",
            "lastname": "pereh",
            "username": "berthio1"
          },
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlcnRoaW8xIiwic3ViIjoiNjI0N2QzMWYyYjBkNzE1NGYzYjAzNjAyIiwiaWF0IjoxNjQ5MDI1MDM0LCJleHAiOjE2NDk2Mjk4MzR9.Kia9SAo6VtnGS6OlPwgWt7sn7j02uopp5iHjEU1yQ3Q",
          "expires": now.getTime() + 14400000
        }
      }
    }
    localStorage.setItem("authed", JSON.stringify(object));
    const token = localStorage.getItem("authed");
    dispatch(setIsAuthed(token));
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            <Redirect to="/Home" />
          </Route>
          <Route
            path="/Home"
            exact={true}
            render={(props) =>
              isAuthenticated() ? <Home /> : <Redirect to="/Login" />
            }
          />
          <Route
            path="/Login"
            exact={true}
            render={(props) =>
              isAuthenticated() ? <Redirect to="/Home" /> : <Login />
            }
          />
          <Route
            path="/SignUp"
            exact={true}
            render={(props) =>
              isAuthenticated() ? <Redirect to="/Home" /> : <SignUp />
            }
          />
          <Route
            path="/message/:id"
            exact={true}
            render={(props) =>
              isAuthenticated() ? <ViewMessage /> : <Redirect to="/login" />
            }
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
