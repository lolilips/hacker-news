import {NewsItem} from "./NewsItem/NewsItem";
import {useEffect, useState} from "react";

const initNews = [
{
  title: 'Первая новсть',
  url: 'www.example.com',
  data: '11.11.11',
  score: 100,
  id: '1'
},
{
  title: 'Первая1 новсть',
      url: 'www.example.com',
    data: '13.11.11',
    score: 110,
  id: '2'
},
{
  title: 'Первая2 новсть',
      url: 'www.example.com',
    data: '12.11.11',
    score: 200,
  id: '3'
},
]
const newNews ={
  title: 'Первая3 новсть',
  url: 'www.example.com',
  data: '14.11.11',
  score: 220,
  id: '5'
}
function App() {
  const checkStorage = () => JSON.parse(window.localStorage.getItem('newsKey')) || initNews
  const [news, setNews] = useState(checkStorage)
  useEffect(()=>{
    window.localStorage.setItem('newsKey', JSON.stringify(news))
  }, [news])


  const newCountHandler = () => {
    setNews((prevState)=>[...prevState, newNews])
  }

  return (
    <>
      <div>КОоличество новостей: {news.length}</div>
      <button onClick={newCountHandler}>Добавить новость</button>
      {
        news.map(item =>{
          return (
              <NewsItem
                  key={item.id}
              title={item.title}
              url={item.url}
              username={item.username}
              date={item.data}
              score={item.score}
          />
          )
      })
      }
    </>
  );
}

export default App;
