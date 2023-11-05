import React, { useEffect } from 'react';
import './Home.css';
import { Col, Container, Row } from 'react-bootstrap';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { expertGet } from '../../Redux/action/auth';
import { cloudURL } from '../../Util/helper';
import Loader from '../../Util/Loader';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { loading, expertGetData } = useSelector((state) => state.getHomeExpert)

    useEffect(() => {
        dispatch(expertGet())
    }, [])

    const CustomPrevArrow = ({ className, style, onClick }) => {
        return <div className={`${className} leading_experts_slick_prev`} style={{ ...style }} onClick={onClick} />
    }

    const CustomNextArrow = ({ className, style, onClick }) => {
        return <div className={`${className} leading_experts_slick_next`} style={{ ...style }} onClick={onClick} />
    }

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrow: true,
                    prevArrow: <CustomPrevArrow />,
                    nextArrow: <CustomNextArrow />,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrow: true,
                    prevArrow: <CustomPrevArrow />,
                    nextArrow: <CustomNextArrow />,
                }
            }
        ]
    };

    return (
        <div className='home_main'>
            <div className='banner_main'>
                <Container fluid style={{ paddingLeft: "0" }}>
                    <Row>
                        <Col md={6}>
                            <div className='banner_left'>
                                <h2>SIGN UP NOW</h2>
                                <h1>This course is 100% online 100% free for students</h1>
                                <p>This course will allow students to analyze the ideology of what design disruption is,
                                    looking at the historic connotations of the concept of ‘street wear’ as well as its
                                    current iterations; between authenticity and commodity, luxury and accessibility,
                                    clothes and fashion, form and function. </p>

                                <div className='text-center mt-4'>
                                    <button onClick={() => navigate("/signup")}>SIGN UP</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='section1_banner'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <img src='/images/logo.png' alt='' className='top_logo' />
                        </Col>

                        <Col md={5}>
                            <div className='section1_left'>
                                <h1>GET A SNEAK PEEK</h1>

                                <h2>Learn from the <br />
                                    leading disrupters</h2>
                            </div>
                        </Col>
                        <Col md={7}>
                            <img src='/images/section1_video.png' alt='' />
                        </Col>

                        <Col md={12}>
                            <button onClick={() => navigate("/signup")}>Sign up</button>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='leading_experts'>
                <Container className='mb-5'>
                    <h1>industry experts</h1>
                    <img src='/images/leading_expert_underline.png' alt='' />
                    {
                        loading ? <div style={{ margin: "70px 0" }}> <Loader /> </div> :
                            <Slider {...settings} className='mt-5'>
                                {
                                    expertGetData?.data?.rows?.map((e) => {
                                        return (
                                            <div className='expert_box'>
                                                <img src={`${cloudURL}logo/${e?.user_avatar}`} alt='' style={{ height: "234px", objectFit: "cover" }} />
                                                <h5>{`${e.first_name} ${e.last_name}`}</h5>
                                                <p>{e?.Profession?.title}</p>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                    }
                </Container>
                <Container className='mt-5' id='about'>
                    <Row className='justify-content-center'>
                        <Col md={8}>
                            <div className='title_cactus_box'>
                                <img src='/images/title_cactus.png' alt='' />
                                <p>
                                    Cactus Jack Gardens is a community garden initiative that has partnered with several
                                    elementary schools across Houston, TX where students learn agricultural economics
                                    and nutritional skills to combat food insecurity. The initiative launched on November 4th,
                                    2021 at Young Elementary School with a permanent reading pergola dedicated to Scott’s
                                    grandmother, a Houstonian native, called Miss Sealie’s Corner. The foundation continues
                                    to roll out new gardens throughout the city through their multi-school expansion program,
                                    with the latest garden unveiling on Earth Day 2022 at Attucks Middle School,
                                    hosted by Scott’s mother Wanda Webster and Cactus Jack Foundation volunteers.</p>

                                <div className='text-center mt-5'>
                                    <button onClick={() => navigate("/signup")}>Sign Up</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='program_overview'>
                <Container className='mb-5'>
                    <h1>PROGRAM OVERVIEW</h1>
                    <img src='/images/leading_expert_underline.png' alt='' />
                </Container>

                <div className='program_overview_section'>
                    <Container>
                        <Row className='justify-content-around'>
                            <Col md={3}>
                                <div className='program_box'>
                                    <h5>Learn the Business</h5>

                                    <p>Students will gain an understanding and apply the theory of “design disruption” in the fashion / music industry.</p>
                                </div>
                            </Col>

                            <Col md={3}>
                                <div className='program_box'>
                                    <h5>Learn from the <br /> experts</h5>

                                    <p>These experts work closely with Travis and at the Cactus Jack brand to break down what is normal and be the best in the industry.</p>
                                </div>
                            </Col>

                            <Col md={3}>
                                <div className='program_box'>
                                    <h5>Experiential Learning</h5>

                                    <p>
                                        The program's emphasis on experiential learning immerses students in the subject matter, allowing for a deeper grasp of concepts.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}
export default Home