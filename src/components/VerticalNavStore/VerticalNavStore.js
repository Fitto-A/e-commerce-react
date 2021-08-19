import React from 'react'
import './styles.scss'

const VerticalNavStore = ({ options, defaultValue, handleFilter,  }) => {
    return (
        <div className='vertical-container' value={defaultValue}>

            { options.map((option, index)=> {
                const {name, value} = option
                return(
                    <ul key={index}>
                        <li>
                            <button value={value} name={name} onClick={handleFilter}>
                                {name}
                            </button>
                        </li>
                    </ul>
                )
            }) }
        </div>
    )
}

export default VerticalNavStore
