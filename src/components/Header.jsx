import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../App"

export default function Header() {

    const {user} = useContext(UserContext)

    return (
        <header className="header">
            <div className="logo">moodmap</div>
            <nav>
                <ul>
                    <Link to="/">
                        <li>Свяжитесь с нами</li>
                    </Link>
                    <Link to="/feedbacks">
                        <li>Отзывы</li>
                    </Link>
                    {
                        !user && (
                            <>
                                <Link to="login">
                                    <li>Войти</li>
                                </Link>
                                <Link to="reg">
                                    <li>Регистрация</li>
                                </Link>
                            </>

                        )
                    }
                </ul>
            </nav>
            {
                user && (
                    <Link to="/profile">
                        <button>Личный кабинет</button>
                    </Link>
                )
            }
        </header>
    )
}