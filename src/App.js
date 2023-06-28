import {NewsItem} from "./components/NewsItem/NewsItem";
import {useEffect, useState} from "react";
import {get} from "./api/api";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {NewListPage} from "./pages/NewsListPage/NewListPage";
import {CommentsPage} from "./pages/CommentsPages/CommentsPage";
import {Layout} from "./components/Layout/Layout";


function App() {
  return(
      <Layout>
<BrowserRouter>
<Routes>
  <Route path='/' element={<NewListPage/>}/>
  <Route path='comments/:id' element={<CommentsPage/>}/>
</Routes>
</BrowserRouter>
      </Layout>
  )
}

export default App;
