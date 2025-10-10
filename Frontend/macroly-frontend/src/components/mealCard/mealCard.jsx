import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody } from '@progress/kendo-react-layout';
import axios from 'axios'
import './mealCard.css'

// receives a food_name, photo url, calories, and macros?

function MealCard({ name, restaurant, vicinity, calories, protein, fat, carbs }) {
    return (
        <Card className="meal-card">
            <CardHeader className="meal-card-header">
                <h3 className="meal-name">{name}</h3>
                <p className="restaurant-name">{restaurant}</p>
            </CardHeader>

            <CardBody className="meal-card-body">
                <p className="vicinity">{vicinity}</p>
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
            </CardBody>
        </Card>
    );
}

export default MealCard;