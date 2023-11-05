import React from "react";
import "../admin.css";
import ProfileForm from "../../../Components/ProfileForm/ProfileForm";

const Profile = () => {
  return (
    <div>
      <div className='Divider'>
        <div className='TabName'>
          Edit Profile
        </div>
      </div>

      <div className="layout_page_section">
        <ProfileForm admin />
      </div>
    </div>
  );
};

export default Profile;