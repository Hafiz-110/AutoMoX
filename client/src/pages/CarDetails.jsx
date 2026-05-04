import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            const res = await axios.get(`http://localhost:5000/api/cars/${id}`);
            setCar(res.data);
        };
        fetchCar();
    }, [id]);

    if (!car) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px', display: 'flex', gap: '20px' }}>
            {/* Safe Image: Just uses the single string 'img' from your DB */}
            <img src={car.img} alt={car.model} style={{ width: '400px', borderRadius: '10px' }} />
            
            <div>
                <h1>{car.make} {car.model}</h1>
                <p>Price: ${car.price}</p>
                <p>Fuel: {car.fuel}</p>
                {/* Feature 9 Placeholder */}
                <button style={{ padding: '10px', background: 'green', color: 'white' }}>
                    Book Test Drive
                </button>
            </div>
        </div>
    );
};

export default CarDetails;