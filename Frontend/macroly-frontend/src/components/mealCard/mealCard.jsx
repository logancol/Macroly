import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody } from '@progress/kendo-react-layout';
import MacroDonut from '../macroDonut/macroDonut.jsx';
import './mealCard.css'

// receives a food_name, photo url, calories, and macros?

function MealCard({ name, restaurant, vicinity, calories, protein, fat, carbs }) {

    const nutrition = [
        { label: 'Protein', value: protein},
        { label: 'Fat', value: fat},
        { label: 'Carbs', value: carbs}
    ]

    return (
        <Card className="meal-card">
            <CardHeader className="meal-card-header">
                <h3 className="meal-name">{name}</h3>
                <p className="restaurant-name">{restaurant}</p>
                <p className="restaurant-name">{vicinity}</p>
            </CardHeader>
            <CardBody className="meal-card-body">
                <MacroDonut nutrition={nutrition} width={150} height={150}/>
                    <div>
                    <div className="nutrition-info">
                        <div className="nutrient">
                            <span className="label">Calories:</span> {calories} kcal
                        </div>
                        <div className="nutrient">
                            <span className="label">Protein:</span> {protein} g
                        </div>
                        <div className="nutrient">
                            <span className="label">Fat:</span> {fat} g
                        </div>
                        <div className="nutrient">
                            <span className="label">Carbs:</span> {carbs} g
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default MealCard;
