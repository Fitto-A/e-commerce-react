import React  from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';


const MainLayout = props => {
    return(
        <div>
            <Navbar />
            <div className="main">
                {props.children}
            </div>
            <Footer />
        </div>

    )
}

export default MainLayout