import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import { Row, Table } from 'react-bootstrap';
import styles from '../../styles/Leaderboard.module.css';
import ChooseDifficulty from './ChooseDifficulty';


const Leaderboard = () => {

    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/get_leaderboard/${id}/`);
                setData(data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        }
        handleMount();
    }, [id])



    const tableRows = data && data.top_n.map((instance, index) => (
        <tr
            key={index}
            className={data.ranking === index ? styles.UserRanking : styles.RankingRow}>
            <td>{index + 1}</td>
            <td>{instance.owner_name}</td>
            <td>{instance.time_taken}</td>
        </tr>
    ));

    if (data && data.ranking > data.top_n.length + 1) {
        tableRows.push((
            <tr
                key={tableRows.length + 1}
                className={styles.RankingRow}>
                <td>...</td>
                <td>............</td>
                <td>............</td>
            </tr>
        ))
    } 
    
    if (data && data.ranking > data.top_n.length) {
        tableRows.push((
            <tr
                key={tableRows.length + 2}
                className={styles.UserRanking}>
                <td>{data.ranking}</td>
                <td>{data.puzzle_instance.owner_name}</td>
                <td>{data.puzzle_instance.time_taken}</td>
            </tr>
        ))
    }

    return (
        <>
            <Row className="d-flex justify-content-center mt-4">
                <h3>Easy Puzzle Leaderboard</h3>
            </Row>
            <Row className="d-flex justify-content-center mt-2">
                <Table borderless size="sm" className="text-center">
                    <thead>
                        <tr className={styles.RankingHeader}>
                            <td>Rank</td>
                            <td>Player</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </Table>
            </Row>
            <ChooseDifficulty message="Play again?" />
        </>
    )
}

export default Leaderboard