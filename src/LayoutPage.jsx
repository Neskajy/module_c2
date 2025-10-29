import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function LayoutPage() {
    return (
        <div className="container">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}