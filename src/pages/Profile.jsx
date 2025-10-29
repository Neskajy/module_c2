import { useContext, useEffect, useState } from "react"
import { UserContext } from "../App"
import { $fetch } from "../fetch"
import {Feedback} from "../components/Feedback"

export default function Profile() {
    const {user} = useContext(UserContext)
    const [feedbacks, setFeedbacks] = useState(null)

    async function getReviews() {
        const response = await $fetch("api/feedbacks/my")
        setFeedbacks(response?.json?.data)
    }
    
    useEffect(() => {
        console.log(feedbacks)
        getReviews()
    }, [])
    
    return (
        <>
            <div className="profile">
                <div className="me">
                    <div className="avatar"><img src={user?.avatar} alt="" /></div>
                    <h3>{user?.first_name} {user?.last_name} {user?.patronymic}</h3>
                    <h3>{user?.email}</h3>
                    <p>id: {user?.id}</p>
                </div>
    
                <section className="feedbacks">
                    <h2>Мои отзывы</h2>
                    <div className="feedbacks_array">
                        {
                            feedbacks?.map((feedback) => {
                                console.log(feedback)
                                return (
                                    <Feedback
                                        id={feedback?.user?.id}
                                        avatar={feedback?.user?.avatar}
                                        first_name={feedback?.user?.first_name}
                                        last_name={feedback?.user?.last_name}
                                        comment={feedback?.comment}
                                        location={feedback?.location}
                                        emotion={feedback?.emotion}
                                        status={feedback?.status}
                                    />
                                )
                            })
                        }
                    </div>
                </section>
            </div>
        </>
    )
}