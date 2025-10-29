import { useContext, useRef, useState } from "react"
import { UserContext } from "../App"
import UniversalModal from "./UniversalModal";
import { $fetch } from "../fetch";

export function Feedback({id="", avatar="", first_name="", last_name="", location="", comment="", emotion="", status=""}) {

    const {user} = useContext(UserContext);

    const [isClosed1, setIsClosed1] = useState(true);
    const [isClosed2, setIsClosed2] = useState(true);

    const toSmile = {
        "HAPPY": "=)",
        "SAD": "=(",
        "ANGRY": ">=("
    }

    const form = useRef()

    async function saveData(formRef, id) {
        const form = formRef.current

        const formData = new FormData(form)

        const response = await $fetch("api/feedbacks/" + id, {
            "method": "POST",
            body: formData
        })
    }

    return (
        <div className="feedback" onClick={() => setIsClosed1(false)}>
            <div className="avatar"><img src={avatar} alt="" /></div>
            <span className="fio">
                Имя: {first_name} {last_name}
            </span>
            {
                location && location.length > 0 && (
                    <span>Локация: {location}</span>
                )
            }
            <span>{toSmile[emotion]}</span>
            {
                comment && comment.length > 0 && (
                    <p>{comment}</p>
                )
            }
            {
                status && status.length > 0 && (
                    <span>{status}</span>
                )
            }

            <UniversalModal
                title={"Отзыв"}
                isClosed={isClosed1}
                setIsClosed={setIsClosed1}
                children={
                    <>
                        <div className="avatar"><img src={avatar} alt="" /></div>
                        <span className="fio">
                            Имя: {first_name} {last_name}
                        </span>
                        {
                            location && location.length > 0 && (
                                <span>Локация: {location}</span>
                            )
                        }
                        <span>{toSmile[emotion]}</span>
                        {
                            comment && comment.length > 0 && (
                                <p>{comment}</p>
                            )
                        }
                        {
                            status && status.length > 0 && (
                                <span>{status}</span>
                            )
                        }
                    </>
                }
                
            />

            {/* сохранение */}

            <UniversalModal
                title={"Изменить отзыв"}
                isClosed={isClosed2}
                setIsClosed={setIsClosed2}
                saveFunction={() => saveData(form, id)}
                children={
                    <>
                        <form ref={form}>
                            <div className="item">
                                <label htmlFor="emotion">Эмоция</label>
                                <select name="emotion" defaultValue={emotion}>
                                    <option value="HAPPY">{"=)"}</option>
                                    <option value="SAD">{"=("}</option>
                                    <option value="ANGRY">{"<=("}</option>
                                </select>
                            </div>
                            <div className="item">
                                <label htmlFor="comment">Сообщение</label>
                                <textarea name="comment" defaultValue={comment}></textarea>
                            </div>
                            <input type="text" name="_method" value="PATCH" style={{display: "none"}} />
                        </form>
                    </>
                }
                
            />

            {
                user?.id === id && (
                    <div className="buttons">
                        <button className="edit" onClick={(e) => {e.stopPropagation(); setIsClosed2(false)}}>Редактировать</button>
                        <button className="delete">Удалить</button>
                    </div>
                )
            }
        </div>
    )
}