import React from 'react';
import './formInput.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
    return (
        <div className='form-row'>
            {label && (
                <label>
                    {label}
                </label>
            )}

            <input className='form-input' onChange={handleChange} {...otherProps} />
        </div>
    )
}

export default FormInput
