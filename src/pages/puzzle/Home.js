import React from 'react'
import ChooseDifficulty from './ChooseDifficulty'

const Home = () => {
    return (
        <>
            <div><h1 className="text-center mt-5">Sudoku<small className="text-muted"> (demo)</small></h1></div>
            <ChooseDifficulty />
        </>

    )
}

export default Home