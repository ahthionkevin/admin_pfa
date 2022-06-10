import { Fragment } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
// import useToken from "./components/App/useToken";
// import SignIn from "./components/Login/SignIn";
import Sidebar from "./components/sidebar/Sidebar";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import EventList from "./pages/userList/EventList";
import NewArticle from "./pages/newArticle/NewArticle";
import UpdateArticle from "./pages/updateArticle/UpdateArticle";
import User from "./pages/user/User";
import UserList from "./pages/userList/UserList";
import PostList from "./pages/postList/PostList";
import ArticleList from "./pages/articleList/ArticleList";
import UpdateProduct from "./pages/updateProduct/UpdateProduct";
import NewEvent from "./pages/newEvent/NewEvent";

function App() {
    // const { token, setToken } = useToken();

    // if (!token) {
    //     return <SignIn setToken={setToken} />;
    // }

    return (
        <Fragment className="App">
            <BrowserRouter>
                {/* <TopBar setToken={setToken} /> */}
                <div className="container">
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/products" element={<PostList />} />
                        <Route path="/events" element={<EventList />} />
                        {/* <Route path="/newArticle" element={<NewArticle />} /> */}
                        <Route path="/user/:id" element={<User />} />
                        <Route path="/events/:id" element={<UpdateArticle />} />
                        <Route
                            path="/products/:id"
                            element={<UpdateProduct />}
                        />
                        <Route path="/newEvent" element={<NewEvent />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Fragment>
    );
}

export default App;
