import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Chat } from "./components/Chat/Chat";


export const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}>ログインページへ</Route>
                    <Route path="/mainChat" element={<Chat name={'管理人'} />}>ログインページへ</Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}