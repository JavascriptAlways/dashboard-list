import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Item} from "./interfaces.ts";

function List() {
    const [list, setList] = useState<Item[]>([]);
    const [favorites, setFavorites] = useState<Item[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await axios.get<Item[]>(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`);
            setList(prevList => [...prevList, ...response.data]);
            setLoading(false);
        };

        fetchData();
    }, [page]);

    const addToFavorites = (item: Item) => {
        if (!favorites.some(fav => fav.id === item.id)) {
            setFavorites([...favorites, item]);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
        ) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <h1>List</h1>
            <button onClick={() => navigate(-1)}>Back</button>
            <ul>
                {list.map((item, index) => (
                    <li key={index}>
                        <span>{item.id}</span> - <span>{item.title}</span>
                        <button onClick={() => addToFavorites(item)}>
                            {favorites.some(fav => fav.id === item.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </li>
                ))}
            </ul>
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default List;