import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import BooksSearch from "./pages/BooksSearch";
import BooksCategory from "./pages/BooksCategory";
import BookDetails from "./pages/BookDetails";
import Authors from "./pages/Authors";
import AuthorDetails from "./pages/AuthorDetails";
import Books from "./pages/Books";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Page404 />,
  },
  // {
  //   path: "/books",
  //   element: <Books />,
  // },
  {
    path: "/books/category/:categoryName",
    element: <BooksCategory />,
  },
  {
    path: "/books/:workId",
    element: <BookDetails />,
  },
  {
    path: "/authors",
    element: <Authors />,
  },
  {
    path: "/authors/:authorId",
    element: <AuthorDetails />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/search",
    element: <BooksSearch />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
