import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { CurrentUserInfo, cloudURL } from "../../Util/helper";
import { changePassword, updateUserDetails } from "../../Redux/action/auth";
import { useDispatch, useSelector } from "react-redux";
import { errorNotify, successNotify } from "../../Util/toast";

const ProfileForm = ({ admin }) => {
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState("");
  const [fileSelected, setFileSelected] = useState(null);

  let data = CurrentUserInfo()

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    conf_password: "",
  });

  const { loading, updated, error } = useSelector((state) => state.changePassword);
  const { loading: updateUserPassword, updateUserDetail, error: updateUserError } = useSelector((state) => state.updateUser);
  const { UserDetail } = useSelector(state => state.getUserProfile)

  useEffect(() => {
    setProfileData({
      first_name: UserDetail?.data?.first_name,
      last_name: UserDetail?.data?.last_name,
      email: data?.email,
      phone: UserDetail?.data?.phoneNumber,
    })
  }, [UserDetail]);

  useEffect(() => {
    if (updateUserDetail?.status == 1) {
      successNotify('Updated Successfully!');
      dispatch({ type: "UPDATE_USER_DETAILS_RESET" });
    }
    if (updateUserError) {
      errorNotify(updateUserError);
      dispatch({ type: "CLEAR_ERRORS" });
    }
  }, [updateUserDetail?.status, updateUserError]);

  useEffect(() => {
    if (updated?.status == 1) {
      successNotify(updated?.message);
      setPassword({
        old_password: "",
        new_password: "",
        conf_password: "",
      })
      dispatch({ type: "CHANGE_PASSWORD_RESET" });
    }
    if (error) {
      errorNotify(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
  }, [updated?.status, error]);

  const handleProfileInfo = (e) => {
    setProfileData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handlePasswords = (e) => {
    setPassword((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitPassword = () => {
    dispatch(changePassword(password));
  };

  const imageHandler = (e) => {
    const fileList = e.target.files;
    if (!fileList) return;

    setFileSelected(fileList[0]);
    setProfileImg(URL.createObjectURL(e.target.files[0]))
  }

  const updateInfo = () => {

    const fileData = new FormData();

    if (data?.role_name === 'admin') {
      fileData.append("user_avatar", fileSelected);
      fileData.append("first_name", profileData.first_name);
      fileData.append("last_name", 'admin');
      fileData.append("phoneNumber", '123456');
    }
    else {
      fileData.append("user_avatar", fileSelected);
      fileData.append("first_name", profileData.first_name);
      fileData.append("last_name", profileData.last_name);
      fileData.append("phoneNumber", profileData.phone);
    }

    dispatch(updateUserDetails(fileData))
  }

  return (
    <>
      <div className="profile_img_section py-4 px-2 px-md-4 ">
        <div className="profile_img_container">
          {
            UserDetail?.data?.user_avatar ? <img src={profileImg ? profileImg : `${cloudURL}logo/${UserDetail?.data?.user_avatar}`} alt="" /> :
              <img src={profileImg ? profileImg : "/images/profileImg.svg"} alt="" />
          }
        </div>
        <div className="d-flex align-items-center profile_upload_btn">
          <input
            type="file"
            style={{ display: "none" }}
            id="file-input"
            onChange={imageHandler}
          />
          <label
            htmlFor="file-input"
            className="d-flex align-items-center cursor-pointer"
          >
            <img src="/images/camera.png" alt="" />
            <h4 className="mb-0">Upload Photo</h4>
          </label>
        </div>
      </div>
      <hr style={{ color: "rgb(77,77,77)", margin: 0 }} />
      <div className="profile_form_section py-4 px-2 px-md-4">
        <Row>
          <Col md={12}>
            <form>
              <Row>
                <Col md={admin ? 12 : 6}>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={profileData?.first_name}
                    onChange={handleProfileInfo}
                  />
                </Col>
                {!admin && <Col md={6}>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    value={profileData?.last_name}
                    onChange={handleProfileInfo}
                  />
                </Col>}

                <Col md={admin ? 12 : 6}>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={profileData?.email}
                    onChange={handleProfileInfo}
                    disabled={true}
                    style={{ backgroundColor: "rgb(217 217 217)" }}
                  />
                </Col>
                {
                  !admin &&
                  <Col md={6}>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      name="phone"
                      value={profileData?.phone}
                      onChange={handleProfileInfo}
                    />
                  </Col>
                }
                <Col md={12} className="d-flex justify-content-end">
                  <button className="save_btn" type="button" onClick={updateInfo} disabled={updateUserPassword}>
                    {updateUserPassword ? <Spinner size="sm" animation="border" /> : "Save Changes"}
                  </button>
                </Col>

                <Col md={12} className={admin ? "" : `mt-4`}>
                  <input
                    type="password"
                    placeholder="Old Password"
                    name="old_password"
                    value={password?.old_password}
                    onChange={handlePasswords}
                  />
                </Col>
                <Col md={6}>
                  <input
                    type="password"
                    placeholder="New Password"
                    name="new_password"
                    value={password?.new_password}
                    onChange={handlePasswords}
                  />
                </Col>
                <Col md={6}>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="conf_password"
                    value={password?.conf_password}
                    onChange={handlePasswords}
                  />
                </Col>

                <Col md={12} className="d-flex justify-content-end">
                  <button
                    className="save_btn"
                    type="button"
                    onClick={submitPassword}
                  >
                    {loading ? <Spinner size="sm" animation="border" /> : "Change Password"}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileForm;
