import React, { useEffect, useRef, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { COUNTRY_CODES } from '../../constants/constants';
import ReactCountryFlag from 'react-country-flag';
import btnStyles from '../../styles/Button.module.css'

const ProfilePage = () => {

    const [profileData, setProfileData] = useState({
        avatar: '',
        nickname: '',
        created_on: '',
        owner: '',
    })
    const { avatar, nickname, created_on, owner, country } = profileData;
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [editing, setEditing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("nickname", nickname);
        formData.append("owner", owner);
        formData.append("country", country);
        if (imageFile?.current?.files[0]) {
            formData.append("avatar", imageFile?.current?.files[0])
        }
        try {
            const url = 'profile/' + id + '/';
            try {
                await axiosReq.put(url, formData);
                setEditing(false);
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    }

    const handleCountryChange = (event) => {
        const key = event.target.value;
        console.log(key);
        setProfileData(prev => ({
            ...prev,
            country: key
        }));
    }

    const imageFile = useRef();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`profile/${id}`);
                setProfileData(data);
            } catch (err) {
                console.log(err);
            }
        }
        handleMount();
    }, [id])

    let dateString = "";
    if (created_on !== "") {
        const date = new Date(created_on);
        const month = date.toLocaleString('default', { month: 'short' });
        dateString = `${month} ${date.getFullYear()}`;
    }

    return (
        <>
            <Row className="mt-5">
                <Col md={{ span: 4, offset: 2 }} className="text-center">
                    <Avatar
                        src={avatar}
                        height={300} />
                </Col>
                <Col md={4} className="text-center my-auto">
                    <ReactCountryFlag
                        className="emojiFlag"
                        countryCode={country}
                        svg
                        style={{
                            fontSize: '2em',
                            lineHeight: '2em',
                        }}
                        aria-label="United States"
                    ></ReactCountryFlag>
                    <h3 className="mt-2">{profileData.nickname}</h3>
                    <span>Joined {dateString}</span><br></br>
                    {!editing && (
                        <Button 
                            onClick={() => setEditing(!editing)}
                            className={`${btnStyles.Button} ${btnStyles.Wider} mt-2`}
                        >
                            Edit
                        </Button>
                    )}

                </Col>
            </Row>


            {editing && (
                <Form onSubmit={handleSubmit}>
                    <Row className="mt-5 justify-content-center">
                        <Col md={4} className="mx-2">
                            <Form.Group controlId="nickname">
                                <Form.Control
                                    type="text"
                                    placeholder="Nickname"
                                    onChange={(e) => {
                                        setProfileData({
                                            ...profileData,
                                            nickname: e.target.value
                                        })
                                    }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={4} className="mx-2">
                            <Form.Group controlId="avatar">
                                <Form.Label>Avatar</Form.Label>
                                <Form.File
                                    id="image-upload"
                                    ref={imageFile}
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files.length) {
                                            setProfileData({
                                                ...profileData,
                                                avatar: URL.createObjectURL(e.target.files[0]),
                                            });
                                        }
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={4} className="mx-2">
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Country</Form.Label>
                                <Form.Control as="select" custom
                                    onChange={handleCountryChange}
                                >
                                    {Object.keys(COUNTRY_CODES).map(key => (
                                        <option 
                                            key={key}
                                            selected={key === country}
                                            value={key}
                                            onChange={handleCountryChange}
                                        >{COUNTRY_CODES[key]}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3 d-flex justify-content-center text-center">
                        <Button className={`${btnStyles.Button} ${btnStyles.Wider}`} type="submit">Save Profile</Button>
                    </Row>
                    {errors?.content?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                </Form>
            )}

        </>


    )
}

export default ProfilePage