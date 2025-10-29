import { useRef, useState } from "react"
import { $fetch } from "../fetch";
import { Link, useNavigate } from "react-router-dom"

export default function Login() {

    const Navigate = useNavigate()
    
    const form = useRef();

    const [errors, setErrors] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(form.current)

        const response = await $fetch("api/auth/login", {
            method: "POST",
            body: formData
        })

        if (response?.errors) {
            setErrors(response?.errors)
        }

        if (response?.response?.ok) {
            if (response?.json?.data?.credentials) {
                localStorage.setItem("token", response?.json?.data?.credentials)
                setErrors(null)
                alert("Успешная авторизация")
                return Navigate("/profile")
            }
        }
    }

    return (
        <form ref={form} onSubmit={handleSubmit}>
            <div className="item">
                <label htmlFor="email" className="required">Почта</label>
                <input type="email" name="email" required className={errors?.email ? "error" : ""}/>
                <span className="error" style={{color: "red"}}>{errors?.email}</span>
            </div>
            <div className="item">
                <label htmlFor="password" className="required">Пароль</label>
                <input type="password" name="password" required className={errors?.password ? "error" : ""}/>
                <span className="error" style={{color: "red"}}>{errors?.password}</span>
            </div>

            <input type="submit" value="Зарегистрироваться"/>
            <Link to="/reg">
                Нет аккаунта? Зарегистрироваться
            </Link>
        </form>
    )
}