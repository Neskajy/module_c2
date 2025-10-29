import { useEffect, useRef, useState } from "react"
import { Feedback } from "../components/Feedback";

export function Slider() {

    const gallery = useRef();

    let [galleryLength, setGalleryLength] = useState(0)
    let [currSlide, setCurrSlide] = useState(0)

    useEffect(() => {
        if (gallery.current) {
            setGalleryLength(Array.from(gallery.current.children).length)
        }
    }, [])

    function toRight() {
        let newSlide;
        if (currSlide < galleryLength - 1) {
            newSlide = currSlide + 1;
        } else {
            newSlide = 0; // зацикливаем: после последнего — первый
        }
        setCurrSlide(newSlide);
        gallery.current.style.transform = `translateX(calc(-${newSlide} * (100% + 10px)))`;
    }

    function toLeft() {
        let newSlide;
        if (currSlide > 0) {
            newSlide = currSlide - 1;
        } else {
            newSlide = galleryLength - 1; // зацикливаем: перед первым — последний
        }
        setCurrSlide(newSlide);
        gallery.current.style.transform = `translateX(calc(-${newSlide} * (100% + 10px)))`;
    }

    return (
        <div className="slider">
            <div className="slider_wrapper">
                <div className="gallery" ref={gallery}>
                    <Slide name="Отзыв блабла" description="Хорошо" />
                    <Slide name="Отзыв блабла" description="Прекрасно" />
                    <Slide name="Отзыв блабла" description="Замечательно" />
                </div>
            </div>
            <div className="buttons">
                <button className="toLeft" onClick={toLeft}>(</button>
                <button className="toRight" onClick={toRight}>)</button>
            </div>
        </div>
    )

}

export function Slide({name="", description=""}) {
    return (
        // <div className="slide">
        //     <span className="name">{name}</span>
        //     <p className="description">{description}</p>
        // </div>

        <Feedback />
    )
}

export default function Landing() {
    return (
        <>
            <section className="about">
                <h2>О нас</h2>
                <h3>ДААААА, ДАААААААА!!! имба сервис</h3>
                <div className="blocks">
                    <div className="block">
                        <h4>Бла бла</h4>
                        <span>Окак Окак Окак Окак</span>
                    </div>
                    <div className="block">
                        <h4>Бла бла</h4>
                        <span>Окак Окак Окак Окак</span>
                    </div>
                    <div className="block">
                        <h4>Бла бла</h4>
                        <span>Окак Окак Окак Окак</span>
                    </div>
                </div>
            </section>

            <section className="grades">
                <h2>Оценки</h2>
                <Slider />
            </section>

            <section className="callMe">
                <h2>Свяжитесь с нами</h2>
                {/* без функционала пон да */}
                <form>
                    <div className="item">
                        <label htmlFor="phone">Номер телефона</label>
                        <input type="text" name="phone" required/>
                    </div>
                    <div className="item">
                        <label htmlFor="first_name">Имя</label>
                        <input type="text" name="first_name" required/>
                    </div>
                    <div className="item">
                        <label htmlFor="message">Сообщение</label>
                        <textarea type="text" name="message" required/>
                    </div>
                    <input type="submit" value="Связаться" />
                </form>
            </section>
        </>
    )
}