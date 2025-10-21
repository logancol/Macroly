import {useState, useEffect} from 'react'
import { Loader } from '@progress/kendo-react-indicators';
import { Slider } from '@progress/kendo-react-inputs';
import '@progress/kendo-theme-default/dist/all.css'
import './macroSearch.css'

// component used to capture search data and then the api call can happen in app jsx?

function MacroSearch({ searchHandler }) {
    // we neex to set up text input to capture the fats, carbs, protein, and calories from the user
    const [proteinValue, setProteinValue] = useState(0);
    const [carbValue, setCarbValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [fatValue, setFatValue] = useState(0);
    const [calorieValue, setCalorieValue] = useState(0);

    const handleProteinChange = (e) => {
        setProteinValue(Math.floor(e.value));
        console.log(e.value)
    }
    const handleFatChange = (e) => {
        setFatValue(Math.floor(e.value));
        console.log(e.value)
    }
    const handleCarbChange = (e) => {
        setCarbValue(Math.floor(e.value));
        console.log(e.value)
    }
    const handleCalorieChange = (e) => {
        setCalorieValue(Math.floor(e.value));
        console.log(e.value)
    }

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
                <span className="macro-input-group">
                    <p className="macro-label">{"Protein (g)"}</p>
                    <Slider color="blue" onChange={handleProteinChange} step={1} defaultValue={0} value={proteinValue} min={0} max={200}></Slider>
                    <p className="grams">
                        <strong>{proteinValue.toLocaleString()}</strong>
                    </p>
                </span>
                <span className="macro-input-group">
                    <p className="macro-label">{"Fat (g)"}</p>
                    <Slider color="blue" onChange={handleFatChange} step={1} defaultValue={0} value={fatValue} min={0} max={200}></Slider>
                    <p className="grams">
                        <strong>{fatValue.toLocaleString()}</strong>
                    </p>
                </span>
                <span className="macro-input-group">
                    <p className="macro-label">{"Carbs (g)"}</p>
                    <Slider color="blue" onChange={handleCarbChange} step={1} defaultValue={0} value={carbValue} min={0} max={200}></Slider>
                    <p className="grams">
                        <strong>{carbValue.toLocaleString()}</strong>
                    </p>
                </span>
                <span className="macro-input-group">
                    <p className="macro-label">Calories</p>
                    <Slider color="blue" onChange={handleCalorieChange} step={1} defaultValue={0} value={calorieValue} min={0} max={2500}></Slider>
                    <p className="grams">
                        <strong>{calorieValue.toLocaleString()}</strong>
                    </p>
                </span>
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