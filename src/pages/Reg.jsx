import { useRef, useState } from "react"
import { $fetch } from "../fetch";
import { Link, useNavigate } from "react-router-dom"

export default function Reg() {

    const Navigate = useNavigate()
    
    const form = useRef();

    const [errors, setErrors] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(form.current)

        if (formData.get("password") !== formData.get("password_repeat")) {
            setErrors({
                "password": "Пароли должны совпадать",
                "password_repeat": "Пароли должны совпадать"
            })
            return;
        }

        formData.delete("password_repeat")

        const response = await $fetch("api/auth/register", {
            method: "POST",
            body: formData
        })

        if (response?.json?.errors) {
            setErrors(response?.json?.errors)
        }

        if (response?.response?.ok) {
            setErrors(null)
            alert("Успешная регистрация")
            return Navigate("/login")
        }

        console.log(response)
    }

    return (
        <form ref={form} onSubmit={handleSubmit}>
            <div className="item">
                <label htmlFor="first_name" className="required">Фамилия</label>
                <input type="text" name="first_name" required className={errors?.first_name ? "error" : ""}/>
                <span className="error" style={{color: "red"}}>{errors?.first_name}</span>
            </div>
            <div className="item">
                <label htmlFor="last_name" className="required">Имя</label>
                <input type="text" name="last_name" required className={errors?.last_name ? "error" : ""}/>
                <span className="error" style={{color: "red"}}>{errors?.last_name}</span>
            </div>
            <div className="item">
                <label htmlFor="patronymic">Отчество</label>
                <input type="text" name="patronymic" className={errors?.patronymic ? "error" : ""}/>
                <span className="error" style={{color: "red"}}>{errors?.patronymic}</span>
            </div>
            <div className="item">
                <label htmlFor="email" className="required">Почта</label>
                <input type="email" name="email" required className={errors?.email ? "error" : ""}/>
                <span className="error" style={{color: "red"}}>{errors?.email}</span>
            </div>
            <div className="item">
                <label htmlFor="avatar">Ваша фотка</label>
                <input type="file" name="avatar" className={errors?.avatar ? "error" : ""}/>
                <span className="error" style={{color: "red"}}>{errors?.avatar}</span>
            </div>
            <div className="item">
                <label htmlFor="password" className="required">Пароль</label>
                <input type="password" name="password" required className={errors?.password ? "error" : ""}/>
                <span className="error" style={{color: "red"}}>{errors?.password}</span>
            </div>
            <div className="item">
                <label htmlFor="password_repeat" className="required">Повторите пароль</label>
                <input type="password" name="password_repeat" required className={errors?.password_repeat ? "error" : ""}/>
                <span className="error" style={{color: "red"}}>{errors?.password_repeat}</span>
            </div>

            <input type="submit" value="Зарегистрироваться"/>
            <Link to="/login">
                Есть акккаунт? Войти
            </Link>
        </form>
    )
}