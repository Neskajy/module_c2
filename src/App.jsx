import { createContext, useContext, useEffect, useState } from "react"
import { $fetch } from "./fetch"
import { Route, Routes, HashRouter, Navigate, useNavigate } from "react-router-dom"
import LayoutPage from "./LayoutPage"
import Reg from "./pages/Reg.jsx"
import Profile from "./pages/Profile.jsx"
import Login from "./pages/Login.jsx"
import Landing from "./pages/Landing.jsx"
import FeedbackPage from "./pages/FeedbackPage.jsx"

export function ProtectedRoute({children}) {

    const {user, isAuthChecking} = useContext(UserContext)

    if (isAuthChecking) {
        return;
    }
    if (!user) {
        alert("Ты не авторизован, чувак. Куда лезем?")
        return <Navigate to="/login"/>
    }
    return children
}

export function ForUnauthorized({children}) {

    const {user, isAuthChecking} = useContext(UserContext)

    if (isAuthChecking) {
        return;
    }
    if (user) {
        alert("Ты авторизован, чувак. Куда лезем?")
        return <Navigate to="/profile"/>
    }
    return children

}

export const UserContext = createContext(null)

export async function getUser() {
    if (localStorage.getItem("token")) {
        const response = await $fetch("api/user/me")
        console.log(response)
        return response
    }
}

export default function App() {
    const [user, setUser] = useState(null)
    const [isAuthChecking, setIsAuthChecking] = useState(true)

    useEffect(() => {

        async function getData() {
            const data = await getUser()
    
            setUser(data?.json?.data?.profile)
            setIsAuthChecking(false)
        }
        getData()

    }, [])
    
    return (
        <UserContext.Provider value={{user, setUser, isAuthChecking}}>
            <HashRouter>
                <Routes>
                    <Route element={<LayoutPage />}>
                        <Route index element={<Landing />}/>
                        <Route path="reg" element={
                            <ForUnauthorized>
                                <Reg/>
                            </ForUnauthorized>
                        } />
                        <Route path="login" element={
                            <ForUnauthorized>
                                <Login />
                            </ForUnauthorized>
                        } />
                        <Route path="feedbacks" element={
                            <FeedbackPage/>
                        }/>
                        <Route path="profile" element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }/>
                    </Route>
                </Routes>
            </HashRouter>
        </UserContext.Provider>
    )
}