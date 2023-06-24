import {useEffect, useState} from "react";
import {get} from "../../api/api";
import {NewsItem} from "../../components/NewsItem/NewsItem";
import styles from './NewsList.module.css'

export function NewList(){
    const [news, setNews] = useState([])

    useEffect(()=>{
        getNewsList()
    }, [])
    async function getNewsList(){
        const newIds = await get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&&orderBy="$priority"&limitToFirst=10')
        const newList = await Promise
            .all(newIds.map((id)=> get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)))
        setNews((newList))
    }

    return (
        <>
            <div>КОоличество новостей: {news.length}</div>
            {
                news.map(item =>{
                    return (
                        <NewsItem
                            className={styles.newsItem}
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            username={item.by}
                            date={item.time}
                            score={item.score}
                        />
                    )
                })
            }
        </>
    );
}