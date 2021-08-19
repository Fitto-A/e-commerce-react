import React from 'react'
import Button from '../Forms/Button'

const LoadMore = ({
    onLoadMoreEvt = () => { },
}) => {
    return (
        <div>
            <Button onClick={() => onLoadMoreEvt() }>
                Cargar Más 
            </Button>
        </div>
    )
}

export default LoadMore
