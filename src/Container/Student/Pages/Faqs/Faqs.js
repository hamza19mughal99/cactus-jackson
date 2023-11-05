import React from 'react';
import './Faqs.css';
import { Accordion, Container } from 'react-bootstrap';

const Faqs = () => {

    return (
        <div className='faq_main'>
            <Container>
                <h1>FREQUENTLY ASKED QUESTIONS</h1>
                <p>Have questions? You’ve come to the right place.</p>

                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <div className='head_question'>
                                <img src='/images/plus.png' alt='' className='plus' />
                                <img src='/images/minus.png' alt='' className='minus' />
                                <div>
                                    <span>1</span>
                                    <h6>What does the program cover?</h6>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            The Cactus Jack Design Ethos program, conceived by the Cactus Jack Foundation and the visionary artist Travis Scott, redefines creative education. This asynchronous program combines industry-leading insights with hands-on projects, offering students a unique journey through the realms of fashion, design and the music industry.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header><div className='head_question'>
                            <img src='/images/plus.png' alt='' className='plus' />
                            <img src='/images/minus.png' alt='' className='minus' />
                            <div>
                                <span>2</span>
                                <h6>Who are the teachers?</h6>
                            </div>
                        </div></Accordion.Header>
                        <Accordion.Body>
                            Courses are taught by creative leaders in Travis Scott's inner circle -  industry leading designers, Cactus Jack team members and fashion and sneaker industry giants.  Students will also receive career insights from other experts working in various roles within the world of design.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header><div className='head_question'>
                            <img src='/images/plus.png' alt='' className='plus' />
                            <img src='/images/minus.png' alt='' className='minus' />
                            <div>
                                <span>3</span>
                                <h6>Do I earn credits?</h6>
                            </div>
                        </div></Accordion.Header>
                        <Accordion.Body>
                            No, The Cactus Jack Design Ethos program is a non-credit program.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header><div className='head_question'>
                            <img src='/images/plus.png' alt='' className='plus' />
                            <img src='/images/minus.png' alt='' className='minus' />
                            <div>
                                <span>4</span>
                                <h6>What do I get when I complete the program?</h6>
                            </div>
                        </div></Accordion.Header>
                        <Accordion.Body>
                            Students who successfully complete the program will have an opportunity to be selected for a scholarship from Fashion Scholarship Fund* or to have their final project selected to be produced by Cactus Jack.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header><div className='head_question'>
                            <img src='/images/plus.png' alt='' className='plus' />
                            <img src='/images/minus.png' alt='' className='minus' />
                            <div>
                                <span>5</span>
                                <h6>Are there any prerequisites?</h6>
                            </div>
                        </div></Accordion.Header>
                        <Accordion.Body>
                            There are no prerequisites to participate. All you need is a passion for learning.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header><div className='head_question'>
                            <img src='/images/plus.png' alt='' className='plus' />
                            <img src='/images/minus.png' alt='' className='minus' />
                            <div>
                                <span>6</span>
                                <h6>Are there any age requirements?</h6>
                            </div>
                        </div></Accordion.Header>
                        <Accordion.Body>
                            Students must be at least 13 years old to participate.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
                        <Accordion.Header><div className='head_question'>
                            <img src='/images/plus.png' alt='' className='plus' />
                            <img src='/images/minus.png' alt='' className='minus' />
                            <div>
                                <span>7</span>
                                <h6>How long do I have to complete the program?</h6>
                            </div>
                        </div></Accordion.Header>
                        <Accordion.Body>
                            Once enrolled, you have unlimited access to the full program. There are approximately 3 hours of videos to watch with multiple choice questions to answer after each section.  You need a 70% score or higher to complete each section.  You have unlimited time to retake the quizzes until you pass.  We know life is busy, which is why we give our students plenty of time to work through the course!
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="7">
                        <Accordion.Header><div className='head_question'>
                            <img src='/images/plus.png' alt='' className='plus' />
                            <img src='/images/minus.png' alt='' className='minus' />
                            <div>
                                <span>8</span>
                                <h6>What can I expect to accomplish by the end of this course?</h6>
                            </div>
                        </div></Accordion.Header>
                        <Accordion.Body>
                            One of the program's standout features is the opportunity to learn from insiders - key players within the Cactus Jack crew and industry experts. Their insights provide a deeper understanding of fashion, music, and design, breaking down preconceptions and offering a comprehensive view of these dynamic fields
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="8">
                        <Accordion.Header><div className='head_question'>
                            <img src='/images/plus.png' alt='' className='plus' />
                            <img src='/images/minus.png' alt='' className='minus' />
                            <div>
                                <span>9</span>
                                <h6>Where do I find the program materials?</h6>
                            </div>
                        </div></Accordion.Header>
                        <Accordion.Body>
                            All program materials are online. You can access and review the materials whenever you like through the course login page.  Once enrolled, you have full access to the course - all you need is an internet-connected device.  Online access is required for the duration of the course and to track your progress.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="9">
                        <Accordion.Header><div className='head_question'>
                            <img src='/images/plus.png' alt='' className='plus' />
                            <img src='/images/minus.png' alt='' className='minus' />
                            <div>
                                <span>10</span>
                                <h6>When and where do the classes meet?</h6>
                            </div>
                        </div></Accordion.Header>
                        <Accordion.Body>
                            Whenever you like - the program is entirely self-paced and on-demand. You can study and access the program lessons whenever and wherever you like.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="10">
                        <Accordion.Header><div className='head_question'>
                            <img src='/images/plus.png' alt='' className='plus' />
                            <img src='/images/minus.png' alt='' className='minus' />
                            <div>
                                <span>11</span>
                                <h6>How much time do I need to dedicate to the program?</h6>
                            </div>
                        </div></Accordion.Header>
                        <Accordion.Body>
                            It varies from person to person, but be prepared to work hard and to dedicate about 3 - 4 hours to watch the video lessons and complete the quizzes.  When you complete all the courses you will need to complete the final project with a short essay and option to upload an image of a design concept or pdf presentation.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="11">
                        <Accordion.Header><div className='head_question'>
                            <img src='/images/plus.png' alt='' className='plus' />
                            <img src='/images/minus.png' alt='' className='minus' />
                            <div>
                                <span>12</span>
                                <h6>What is the final project?</h6>
                            </div>
                        </div></Accordion.Header>
                        <Accordion.Body>
                            The final project design should reflect and express your authentic personal point of view using the ideas and designs you learned in the program.  You will need to think about the level of disruption your design would cause within the industry, coupled with the idea of how to merchandise and market the drop. In order to fully realize the scope of this project, you have to approach this with a level of professionalism in your presentation strategy.

                            Students can choose one of three areas for the design project: <br />

                            ➔	T-shirt graphic design exploration <br />
                            ◆	Present a mood board with images or logos that inspire and complement your product idea. <br />
                            ◆	Show your graphics on a tee shirt mock up. Show 3 options/views. <br />
                            ➔	Experiential event design exploration <br />
                            ◆	Present a mood board that includes an event concept.  The sky's the limit.  Think stage, spaces, lights, themes - dream big! <br />
                            ◆	A strong written concept with sketches/photos <br />
                            ➔	New brand graphic identity/logo exploration <br />
                            ◆	Create a new fashion brand! <br />
                            ◆	Present a mood board of logos/brand identities that inspire you/your design <br />
                            ◆	Show your logo in black and white and and also experiment adding color <br />
                            ◆	Show how your logo/brand might look in use <br />

                            Each project will need to include a short reflective paragraph on the product/idea, a summary of key components of the Marketing and Business plans and description of launch/drop strategy. <br />

                            Consideration will be made to concept as well as layout and communication style.  What you submit has to speak for itself, so making the presentation look good and have a clear story is important. Be creative with the tools you have or can use for free. <br />

                            ●	After I complete the Cactus Jack Design Ethos, what comes next? <br />
                            The team will review all work submitted -  we know you put a lot of hard work and creativity in your projects!  However, we will only get back to you if the Cactus Jack team selects your project as a winner. There is no other follow up needed from students. If your project is not selected, please consider this as a stepping stone in your creative journey.  Your talent and determination are commendable, and we encourage you to continue pursuing your passions! <br />

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </div>
    )
}
export default Faqs