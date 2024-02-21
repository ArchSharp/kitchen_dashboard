import React, { useState, useEffect } from "react";
import { Card, Form, Button, Upload, message, Modal, Input } from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  LockOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  AddStaff,
  UploadImage,
  DeleteStaff,
  GetAllStaffs,
  setStaff,
} from "../../../Features/kitchenSlice";
import {
  selectKitchen,
  useAppSelector,
  useAppDispatch,
} from "../../../Store/store";

function Settings() {
  const dispatch = useAppDispatch();
  const { userData, allStaffs, staff } = useAppSelector(selectKitchen);
  const [modalVisible, setModalVisible] = useState(false);
  const [addStaffModalVisible, setAddStaffModalVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [staffShowPasswords, setStaffShowPasswords] = useState([]);
  const [formData, setFormData] = useState({
    FirstName: "",
    KitchenId: userData.Id,
    LastName: "",
    Email: "",
    Password: "",
    Phone: "",
    University: userData.University,
    Role: "",
  });
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [uploadImageModalVisible, setUploadImageModalVisible] = useState(false);

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const isFormValid = () => {
    return (
      formData.FirstName !== "" &&
      formData.LastName !== "" &&
      formData.Email !== "" &&
      formData.Phone !== "" &&
      formData.University !== "" &&
      formData.Password !== ""
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setIsFormFilled(isFormValid());
  };

  useEffect(() => {
    if (!allStaffs) {
      dispatch(GetAllStaffs(userData?.KitchenEmail));
    }
  }, [allStaffs, dispatch, userData]);

  const handleUpload = async () => {
    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files[0]) {
      formData.append("image", fileInput.files[0]);
      formData.append("KitchenId", userData.Id);

      setUploadImageModalVisible(false);
      dispatch(UploadImage(formData));
    } else {
      message.error("Please select an image to upload.");
    }
  };

  const handleAddStaff = async () => {
    const staffData = {
      ...formData,
      Role: "basic",
      KitchenId: userData.Id,
    };

    dispatch(AddStaff(staffData, userData?.KitchenEmail));
  };

  const togglePasswordVisibility = (index) => {
    const updatedShowPasswords = [...staffShowPasswords];
    updatedShowPasswords[index] = !updatedShowPasswords[index];
    setStaffShowPasswords(updatedShowPasswords);
  };

  const handleDeleteStaff = async () => {
    dispatch(DeleteStaff(staff.Email, userData?.KitchenEmail));
  };

  const isBasicStaff = userData && userData.Role === "basic";
  if (isBasicStaff) {
    return (
      <div style={{ marginTop: "2rem", marginLeft: "7rem" }}>
        <Card title="Settings" style={{ width: "60rem" }}>
          <p>You do not have permission to access this page.</p>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "2rem", marginLeft: "7rem" }}>
      <Card title="Settings" style={{ width: "60rem" }}>
        <Form
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          encType="multipart/form-data"
          id="uploadImage"
        >
          <div
            style={{ justifyContent: "space-between", alignItems: "flex-end" }}
          >
            <Form.Item label="Add New Staff">
              <Button
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                style={{ marginLeft: "35rem" }}
                onClick={() => setAddStaffModalVisible(true)}
              >
                Add Staff
              </Button>
            </Form.Item>

            <Modal
              open={addStaffModalVisible}
              onCancel={() => setAddStaffModalVisible(false)}
              title="Add New Staff"
              footer={[
                <Button key="cancel" onClick={() => setModalVisible(false)}>
                  Cancel
                </Button>,
                <Button
                  key="change"
                  type="primary"
                  onClick={() => {
                    handleAddStaff();
                    setModalVisible(false);
                    setAddStaffModalVisible(false);
                  }}
                  disabled={!isFormFilled}
                >
                  {isAddingStaff ? "Adding Staff..." : "Add Staff"}
                </Button>,
              ]}
            >
              <div style={{ justifyContent: "flex-start" }}>
                <div style={{ justifyContent: "flex-start" }}>
                  <label>Firstname</label>
                  <input
                    type="text"
                    id="FirstName"
                    name="FirstName"
                    placeholder="Input staff email"
                    value={formData.FirstName}
                    onChange={handleInputChange}
                    style={{ width: "70%", height: "10px", borderRadius: 5 }}
                    required
                  />
                </div>
                <div style={{ justifyContent: "flex-start" }}>
                  <label>Lastname</label>
                  <input
                    type="text"
                    id="LastName"
                    name="LastName"
                    placeholder="Input staff Lastname"
                    value={formData.LastName}
                    onChange={handleInputChange}
                    style={{ width: "70%", height: "10px", borderRadius: 5 }}
                    required
                  />
                </div>
                <div style={{ justifyContent: "flex-start" }}>
                  <label>Email</label>
                  <input
                    type="email"
                    id="Email"
                    name="Email"
                    placeholder="Input staff email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    style={{ width: "70%", height: "10px", borderRadius: 5 }}
                    required
                  />
                </div>
                <div style={{ justifyContent: "flex-start" }}>
                  <label>Phone Number</label>
                  <input
                    type="number"
                    id="Phone"
                    name="Phone"
                    placeholder="Input mobile number"
                    value={formData.Phone}
                    onChange={handleInputChange}
                    style={{ width: "70%", height: "10px", borderRadius: 5 }}
                    required
                  />
                </div>
                <div style={{ justifyContent: "flex-start" }}>
                  <label>Password</label>
                  <input
                    type="password"
                    id="Password"
                    name="Password"
                    placeholder="Input staff password"
                    value={formData.Password}
                    onChange={handleInputChange}
                    style={{ width: "70%", height: "10px", borderRadius: 5 }}
                    required
                  />
                </div>
              </div>
            </Modal>

            <Form.Item label="Upload/Update Kitchen Image">
              <Button
                icon={<UploadOutlined />}
                style={{ width: "12rem", marginLeft: "30rem" }}
                onClick={() => setUploadImageModalVisible(true)}
              >
                Upload Image
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>

      <Modal
        title="Upload Kitchen Image"
        open={uploadImageModalVisible}
        onOk={() => {
          setUploadImageModalVisible(false);
        }}
        onCancel={() => setUploadImageModalVisible(false)}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input type="file" style={{ display: "flex", marginLeft: "35%" }} />
          <Button
            type="primary"
            style={{ marginLeft: "1rem" }}
            onClick={handleUpload}
          >
            Upload Image
          </Button>
        </div>
      </Modal>

      {/* Staff Managment Side */}
      <Modal
        title="Confirm Deletion"
        open={deleteConfirmationVisible}
        onOk={() => {
          handleDeleteStaff();
          setDeleteConfirmationVisible(false);
        }}
        onCancel={() => setDeleteConfirmationVisible(false)}
      >
        Do you want to delete this staff
      </Modal>

      <div style={{ marginTop: "2rem" }}>
        <Card title="Staff Management" style={{ width: "60rem" }}>
          <ul>
            {allStaffs?.map((staff, index) => (
              <li key={index}>
                {staff.FirstName} {staff.LastName} -{" "}
                {staffShowPasswords[index] ? staff.Email : "******"}{" "}
                <Button
                  icon={<EyeOutlined />}
                  onClick={() => togglePasswordVisibility(index)}
                  style={{ marginLeft: "1rem", marginTop: "2%" }}
                >
                  {staffShowPasswords[index] ? "Hide" : "Show"}
                </Button>{" "}
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    dispatch(setStaff(staff));
                    setDeleteConfirmationVisible(true);
                  }}
                  style={{ marginLeft: "1rem" }}
                >
                  Delete Staff
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

export default Settings;
