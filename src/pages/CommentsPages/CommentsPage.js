import {Link, useParams} from "react-router-dom";
import {NewsItem} from "../../components/NewsItem/NewsItem";
import {useCallback, useEffect, useState} from "react";
import {get} from "../../api/api";
import {CommentsWrapper} from "../../components/comments/CommentsWrapper";

export function CommentsPage() {
    const {id} = useParams()
    const [news, setNews] = useState()
    const [comments, setComments] = useState([])

    const getNewsComment= useCallback(async (commentIds) => {
        return  await Promise
            .all(commentIds.map(async commentId => {
                const comment = await get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`)
                if(comment?.kids){
                    comment.kids = await getNewsComment(comment.kids)
                }
                return comment
            }))

    }, [])

    const getNewsDate = useCallback(async ()=> {
        const newsDate = await get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        setNews(newsDate)
        if (newsDate?.kids) {
            const commentsData = await getNewsComment(newsDate.kids)
            setComments(commentsData)
    }
}, [id, getNewsComment])


    useEffect(() => {
        getNewsDate()
    }, [getNewsDate])
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
            {comments && (
                <CommentsWrapper comments={comments}/>
            )}
        </div>
    )
}