import React, { useEffect, useRef, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import Avatar from '../../components/Avatar';

const ProfilePage = () => {

    const [profileData, setProfileData] = useState({
        avatar: '',
        nickname: '',
        created_on: '',
        owner: '',
    })
    const { avatar, nickname, created_on, owner } = profileData;
    const { id } = useParams();
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("nickname", nickname);
        formData.append("owner", owner);
        if (imageFile?.current?.files[0]) {
            formData.append("avatar", imageFile?.current?.files[0])
        }
        try {
            const url = 'profile/' + id + '/';
            console.log(url);
            const {data} = await axiosReq.put(url, formData);
            console.log(data);
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    }

    const imageFile = useRef();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`profile/${id}`);
                setProfileData(data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        }
        handleMount();
    }, [id])

    

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mt-5">
                <Col md={{ span: 4, offset: 2 }} className="text-center">
                    <Avatar
                        src={avatar}
                        height={300} />
                </Col>
                <Col md={4} className="text-center my-auto">
                    <h3>{profileData.nickname}</h3>
                    <h5>Joined {created_on}</h5>

                </Col>
            </Row>
            <Row className="mt-4 justify-content-center">
                <Col md={4} className="border mx-2">
                    <Form.Group controlId="avatar">
                        <Form.Label>Change your Avatar</Form.Label>
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
                <Col md={4} className="border rounded mx-2">
                    <Form.Group controlId="nickname">
                        <Form.Label>Change your Nickname</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="New nickname"
                            onChange={(e) => {
                                setProfileData({
                                    ...profileData,
                                    nickname: e.target.value
                                })
                            }} />
                    </Form.Group>
                </Col>


            </Row>
            <Row className="mt-3 d-flex justify-content-center text-center">
                <Button type="submit">Save Profile</Button>
            </Row>
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
        </Form>

    )
}

export default ProfilePage