import {useState, useEffect} from 'react'
import { Loader } from '@progress/kendo-react-indicators';
import '@progress/kendo-theme-default/dist/all.css'
import './macroSearch.css'

// component used to capture search data and then the api call can happen in app jsx?

function MacroSearch({ searchHandler }) {
    // we neex to set up text input to capture the fats, carbs, protein, and calories from the user
    const [proteinValue, setProteinValue] = useState('');
    const [carbValue, setCarbValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [fatValue, setFatValue] = useState('');
    const [calorieValue, setCalorieValue] = useState('');
    const handleProteinChange = event => {
        setProteinValue(event.target.value);
    };
    const handleCarbChange = event => {
        setCarbValue(event.target.value);
    };
    const handleFatChange = event => {
        setFatValue(event.target.value);
    };
    const handleCalorieChange = event => {
        setCalorieValue(event.target.value);
    };

    const searchHandleInternal = async (e) => {
        e.preventDefault();
        const form = {
            protein: proteinValue,
            carbs: carbValue,
            fat: fatValue,
            calories: calorieValue,
        };
        setLoading(true);
        try {
            await searchHandler(form);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={searchHandleInternal} 
        className="macro-search-form">
            <div className = "macro-search-input">
                <input
                    type="number"
                    placeholder="Protein (g)"
                    value={proteinValue}
                    onChange={e => setProteinValue(e.target.value)}
                    className="macro-input"
                />
                <input
                    type="number"
                    placeholder="Carbs (g)"
                    value={carbValue}
                    onChange={e => setCarbValue(e.target.value)}
                    className="macro-input"
                />
                <input
                    type="number"
                    placeholder="Fat (g)"
                    value={fatValue}
                    onChange={e => setFatValue(e.target.value)}
                    className="macro-input"
                />
                <input
                    type="number"
                    placeholder="Calories (kcal)"
                    value={calorieValue}
                    onChange={e => setCalorieValue(e.target.value)}
                    className="macro-input"
                />
            </div>
            <button type="submit" disabled={loading} className="search-button">
                {loading ? (
                    <span className="loader-wrapper">
                        <Loader 
                            type="pulsing"
                            style={{ color: "#ffffff", width: "24px", height: "24px", display: "block" }}
                        />
                    </span>
                ) : (
                    "Search"
                )}
            </button>
        </form>
    );
}

export default MacroSearch;