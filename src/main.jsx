import ReactDOM from 'react-dom/client';  // react-dom/client üzerinden import edin
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from "./app/layouts/Layout.jsx";
import Home from "./app/components/Home.jsx";
import './App.scss'
import DetailPage from "./app/components/DetailPage.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/detailPage",
                element: <DetailPage />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
);
