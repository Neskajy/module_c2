import { useEffect } from "react"
import { createPortal } from "react-dom"

export default function UniversalModal({title="", children, saveFunction, isClosed, setIsClosed}) {

    async function onSave() {
        saveFunction()
    }

    return createPortal(
        <div className={`modal ${isClosed ? "closed" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="modal__inner">
                <div className="close" onClick={() => {setIsClosed(true); console.log("lll")}}>
                    x
                </div>
                <div className="modal__wrapper">
                    <div className="title"></div>
                    {children}
                    <div className="buttons">
                        {saveFunction && (
                            <button onClick={onSave}>Сохранить</button>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}