import {Link, useParams} from "react-router-dom";
import {NewsItem} from "../../components/NewsItem/NewsItem";
import {useEffect, useState} from "react";
import {get} from "../../api/api";

export function Comments() {
    const {id} = useParams()
    const [news, setNews] = useState()
    const [comments, setComments] = useState([])

    async function getNewsDate(newsId) {
        const newsDate = await get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`)
        setNews(newsDate)
        if (newsDate?.kids) {
            getNewsCommet(newsDate.kids)
    }
}
    async function getNewsCommet(commentIds) {
        const commentsData = await Promise
            .all(commentIds.map(commentIds => get(`https://hacker-news.firebaseio.com/v0/item/${commentIds}.json?print=pretty`)))
   setComments(commentsData)
        console.log(commentsData)
    }

    useEffect(() => {
        getNewsDate(id)
    }, [id])
    return (
        <div>

     <Link to='/'>Назад</Link>
            {news &&(
            <NewsItem
            title ={news.title}
            username ={news.by}
            date ={news.time}
            url={news.url}
            />
                )}
        </div>
    )
}