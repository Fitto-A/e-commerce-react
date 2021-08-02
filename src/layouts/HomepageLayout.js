import React  from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';


const HomepageLayout = props => {
    return(
        <div className='fullHeight'>
            <Navbar />
            {props.children}
            <Footer />
        </div>

    )
}

export default HomepageLayout