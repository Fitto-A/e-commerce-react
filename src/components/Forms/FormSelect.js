import React from 'react'
import './FormSelect.scss'

const FormSelect = ({ options, defaulValue, handleChange, label, ...otherProps }) => {
    if (!Array.isArray(options) || options.length < 1) return null;

    return (
        <div className='form-row'>
            {label && (
                <label>
                    {label}
                </label>
            )}

            <select className="form-select" value={defaulValue} onChange={handleChange} {...otherProps}>
                {options.map((option, index)=> {
                    const {name, value} = option
                    return (
                        <option key={index} value={value}>
                            { name }
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default FormSelect
