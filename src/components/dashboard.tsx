import { Link } from 'react-router-dom';
import {Item} from "./interfaces.ts";

function Dashboard({ itemList }: { itemList: Item[] }) {
    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {itemList.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
            <Link to="/list">
                <button>Go to List</button>
            </Link>
        </div>
    );
}

export default Dashboard;