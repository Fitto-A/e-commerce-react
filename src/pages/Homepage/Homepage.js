import React from 'react'
import './styles.scss';
import ImgIzq from '../../assets/Jenga.jpg';
import ImgDer from '../../assets/Rompecabezas.jpg'

const Homepage = () => {
    return (
        <section className='homepage'>
            <div className="container">
                <div 
                    className="image"
                    style={{ backgroundImage: `url(${ImgIzq})` }}
                >
                </div>
                <div 
                    className="image"
                    style={{ backgroundImage: `url(${ImgDer})` }}
                >
                </div>
            </div>
        </section>
    )
}

export default Homepage;
