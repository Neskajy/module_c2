import { useEffect, useRef, useState } from "react"
import { $fetch } from "../fetch"
import { Feedback } from "../components/Feedback";

export default function FeedbackPage() {

    const [feedbacks, setFeedbacks] = useState(null)


    async function getFeedbacks() {
        const response = await $fetch("api/feedbacks/created");
        setFeedbacks(response?.json?.data)
    }

    useEffect(() => {
        getFeedbacks()
    }, [])

    const filters = useRef();

    async function handleSearch(e) {
        e.preventDefault();

        const formData = new FormData(filters.current);

        const location = formData.get("location_name")

        const response = await $fetch("api/feedbacks", {
            "method": "GET",
            body: {"location_name": location}
        })

        console.log("!!!!!!!!!", response?.json?.data?.items)

        setFeedbacks(response?.json?.data?.items)
    }



    return (
        <section className="feedbacks">
            <h2>Все отзывы</h2>
            <div className="filters">
                <h3>Найти отзыв</h3>
                <form ref={filters} onSubmit={handleSearch}>
                    <div className="item">
                        <label htmlFor="location_name">Адрес локации</label>
                        <input type="text" name="location_name"/>
                    </div>
                    <input type="submit" value="Найти" />
                </form>
            </div>
            
            <div className="feedbacks_array">
                {
                    feedbacks && Array.isArray(feedbacks) && (
                        feedbacks.map((feedback) => {
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
                    )

                }
            </div>
        </section>
    )
}