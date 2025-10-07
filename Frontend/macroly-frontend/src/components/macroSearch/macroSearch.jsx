import {useState, useEffect} from 'react'
import { TextBox } from '@progress/kendo-react-inputs';
import './macroSearch.css'

// component used to capture search data and then the api call can happen in app jsx?

function MacroSearch({location}) {
    // we neex to set up text input to capture the fats, carbs, protein, and calories from the user
    // 
    const [proteinValue, setProteinValue] = useState('');
    const [carbValue, setCarbValue] = useState('');
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("form submitted")
    }

    return (
        <form onSubmit={handleSubmit} className="macro-search-form">
            <div className = "macro-search-input">
                <TextBox 
                    fillMode="solid"
                    className="custom-textbox"
                    placeholder="Protein (g)" 
                    value={proteinValue} 
                    onChange={handleProteinChange}/>
                <TextBox 
                    fillMode="solid"
                    className="custom-textbox"
                    placeholder="Carbs (g)" 
                    value={carbValue} 
                    onChange={handleCarbChange}/>
                <TextBox 
                    fillMode="solid"
                    className="custom-textbox"
                    placeholder="Fat (g)" 
                    value={fatValue} 
                    onChange={handleFatChange}/>
                <TextBox 
                    fillMode="solid"
                    className="custom-textbox"
                    placeholder="Calories (kcal)" 
                    value={calorieValue} 
                    onChange={handleCalorieChange}/>
            </div>
            <button type="submit">Search</button>
        </form>
    );
}

export default MacroSearch;