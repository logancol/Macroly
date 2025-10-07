import { useState, useEffect } from 'react'
import { Card } from '@progress/kendo-react-layout';
import axios from 'axios'

// receives a food_name, photo url, calories, and macros?

function MealCard({ food_name, vendor, photo, calories, macros, distance, price }) {
    return (
        <Card
            style={{
                width: 260,
                boxShadow: '0 0 4px 0 rgba(0, 0, 0, .1)',
                marginTop: '15px',
                padding: '10px',
                textAlign: 'center',
            }}
        >
            <img
                src={photo}
                alt={food_name}
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
            />
            <h3 style={{ margin: '10px 0', fontSize: '18px' }}>{food_name}</h3>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>Calories: {calories}</p>
            {macros && (
                <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    Macros: {macros.protein}g Protein, {macros.carbs}g Carbs, {macros.fat}g Fat
                </p>
            )}
            {distance && (
                <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    Km from you: {distance}
                </p>
            )}
            {price && (
                <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    Item Price: {distance}
                </p>
            )}
            {vendor && (
                <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    Vendor: {vendor}
                </p>
            )}
        </Card>
    )
}

export default MealCard;