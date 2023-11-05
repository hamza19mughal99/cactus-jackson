import React from "react";
import "./profile.css";
import { Col, Container, Row } from "react-bootstrap";
import ProfileForm from "../../../../Components/ProfileForm/ProfileForm";

const Profile = () => {
  return (
    <div className="student_profile_main">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="profile_info_section">
              <ProfileForm />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Profile;