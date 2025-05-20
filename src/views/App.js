import "../styles/App.scss";
import Nav from "../views/Nav.js";
import Register from "../views/Register";
import Login from "../views/Login.js";
import { ToastContainer } from "react-toastify";
import ForgotPass from "./ForgotPass";
import "react-toastify/dist/ReactToastify.css";
import Shopping from "./Shopping";
import DetailItem from "../components/DetaiItem";
import Cart from "./Cart";
import OrderDetail from "../components/OrderDetail";
import CheckOut from "./CheckOut";
import Home from "./Home";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Personal from "./Personal";
import { AuthProvider } from "../stores/AuthContext";
import { IconButton } from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SuccessOrder from "./SuccessOrder";
import { handleTop } from "../assets/action/Action";
import BuyNow from "./BuyNow.js";
import FooterA from "../components/Footer/FooterA.js";
import User from "./User/User.js";
import History from "./History/History.js";
import Detail from "./History/Detail.js";
import Account from "./Account/Account.js";
import Support from "./Support/Support.js";
import Find from "./Find/Find.js";
import FPassword from "./FPassword/FPassword.js";
import PaymentCallback from "./PaymentCallback";
import News from "./News/News.js";

function App() {
  const [isLog, setIsLog] = useState(false);
  const [btn, setbtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setbtn(true);
      } else {
        setbtn(false);
      }
    });
  }, []);

  return (
    <AuthProvider>
      <Router basename="/L&T_Fashion_Shop">
        <div className="App">
          <header className="App-header">
            <Nav value={isLog} />

            {btn ? (
              <div
                style={{
                  position: "fixed",
                  right: 30,
                  bottom: 50,
                  background: "red",
                  borderRadius: 30,
                  zIndex: 99
                }}
              >
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => handleTop()}
                >
                  <NorthIcon fontSize="inherit" style={{ color: "white" }} />
                </IconButton>
              </div>
            ) : (
              <></>
            )}

            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/Support" exact>
                <Support />
              </Route>
              <Route path="/News" exact>
                <News />
              </Route>
              <Route path="/ForgotPass" exact>
                <FPassword />
              </Route>
              <Route path="/Find/:id">
                <Find />
              </Route>
              <Route path="/User" exact>
                <User />
              </Route>
              <Route path="/History" exact>
                <History />
              </Route>
              <Route path="/Account" exact>
                <Account />
              </Route>
              <Route path="/History/:id" exact>
                <Detail />
              </Route>
              <Route path="/home" exact>
                <Personal />
              </Route>
              <Route path="/Register">
                <Register />
              </Route>
              <Route path="/Login">
                <Login isLog={isLog} setIsLog={setIsLog} />
              </Route>
              <Route path="/SuccessOrder">
                <SuccessOrder />
              </Route>
              <Route path="/payment-callback">
                <PaymentCallback />
              </Route>
              <Route path="/ForgotPass">
                <ForgotPass />
              </Route>

              <Route path="/Shopping" exact>
                <Shopping />
              </Route>
              <Route path="/BuyNow/:id">
                <BuyNow />
              </Route>
              <Route path="/Shopping/:id">
                <DetailItem />
              </Route>
              <Route path="/OrderDetail/:id" component={OrderDetail} />

              <Route path="/Cart">
                <Cart />
              </Route>
              <Route
                path="/Checkout"
                render={(props) => <CheckOut {...props} />}
              />
            </Switch>
          </header>

          {/* foooter */}

          <FooterA value={isLog} />

          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
