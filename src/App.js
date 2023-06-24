import {NewsItem} from "./components/NewsItem/NewsItem";
import {useEffect, useState} from "react";
import {get} from "./api/api";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {NewList} from "./pages/NewsList/NewList";
import {Comments} from "./pages/comments/Comments";
import {Layout} from "./components/Layout/Layout";


function App() {
  return(
      <Layout>
<BrowserRouter>
<Routes>
  <Route path='/' element={<NewList/>}/>
  <Route path='comments/:id' element={<Comments/>}/>
</Routes>
</BrowserRouter>
      </Layout>
  )
}

export default App;
