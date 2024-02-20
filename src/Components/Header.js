import React, { useState, useEffect } from "react";
import "./dash.css";
import quickeeImage from "./Quickee.jpeg";
import {
  Badge,
  Image,
  Rate,
  Space,
  Typography,
  Modal,
  Button,
  Input,
} from "antd";
import { MailOutlined, BellFilled } from "@ant-design/icons";
import { GetReviews, NotifyEveryone } from "../Features/kitchenSlice";
import { message } from "antd";
import { selectKitchen, useAppSelector, useAppDispatch } from "../Store/store";

function Header() {
  // const { userData, auth } = useMenuContext();
  const dispatch = useAppDispatch();
  const { userData, auth, reviews } = useAppSelector(selectKitchen);
  // const [totalReviews, setTotalReviews] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const storedKitchenImageUrl = localStorage.getItem("kitchenImageUrl");
  const [totalAgreeCount, setTotalAgreeCount] = useState(0);
  const [totalDisagreeCount, setTotalDisagreeCount] = useState(0);

  useEffect(() => {
    if (!reviews) {
      const isBasicStaff = userData?.Role === "basic";
      const kitchenId = isBasicStaff ? userData?.KitchenId : userData?.Id;
      dispatch(GetReviews(kitchenId));
    }
  }, []);

  const imageStyle = {
    width: "50px",
    borderRadius: "50%",
  };

  const getKitchenImageUrl = () => {
    if (userData && userData.KitchenImage) {
      return `http://10.10.64.21:85/Uploads/${userData.KitchenImage}`;
    }
    return quickeeImage;
  };

  const kitchenImageUrl = getKitchenImageUrl();

  if (kitchenImageUrl !== storedKitchenImageUrl) {
    localStorage.setItem("kitchenImageUrl", kitchenImageUrl);
  }

  const handleBellIconClick = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    const payload = {
      Title: notificationTitle,
      UserId: "abcd",
      Message: notificationMessage,
    };
    try {
      const response = await NotifyEveryone(payload, auth, userData);
      if (response.code === 200) {
        message.success("Notification sent successfully");
        setIsModalVisible(false);
      } else {
        message.error("Error sending notification");
      }
    } catch (error) {
      console.log(error?.response?.data);
      message.error("Internal Server Error");
    }
    // setIsModalVisible(false);
  };

  // Handle modal Cancel button click
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const calculateKitchenRating = () => {
    const totalCount = totalAgreeCount + totalDisagreeCount;

    if (totalCount === 0) {
      return 0.0;
    }

    const agreementRatio = totalAgreeCount / totalCount;
    const maxRating = 5.0;

    return agreementRatio * maxRating;
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (reviews) {
          const reviewsResponse = reviews;

          // if (reviewsResponse && Array.isArray(reviewsResponse)) {
          const totalAgree = reviewsResponse.reduce(
            (total, review) => total + parseInt(review.AgreeCount),
            0
          );
          const totalDisagree = reviewsResponse.reduce(
            (total, review) => total + parseInt(review.DisagreeCount),
            0
          );
          setTotalAgreeCount(totalAgree);
          setTotalDisagreeCount(totalDisagree);
          // }
        }
      } catch (error) {
        console.error("Error fetching kitchen reviews:", error);
      }
    };

    fetchReviews();
  }, [userData?.Id, auth]);

  const kitchenRating = calculateKitchenRating();
  const isBasicStaff = userData && userData.Role === "basic";

  return (
    <div className="Header">
      <Image src={kitchenImageUrl} style={imageStyle} />
      <Typography.Title style={{ fontFamily: "sans-serif", marginLeft: "5%" }}>
        {isBasicStaff
          ? `${userData.FirstName} ${userData.LastName} (staff)`
          : userData
          ? userData.KitchenName
          : "Loading..."}
      </Typography.Title>

      <div style={{ marginRight: "3%" }}>
        <Space size={26}>
          <Rate value={kitchenRating} disabled allowHalf />
          <span
            style={{ marginLeft: "5px", fontSize: "16px", fontWeight: "bold" }}
          >
            {kitchenRating.toFixed(1)}
          </span>
          <Badge count={reviews?.length} style={{ cursor: "pointer" }}>
            <MailOutlined style={{ fontSize: "20px" }} />
          </Badge>
          <Badge style={{ cursor: "pointer" }} onClick={handleBellIconClick}>
            <BellFilled style={{ fontSize: "20px" }} />
          </Badge>
        </Space>
      </div>

      <Modal
        title="Notification Modal"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleModalOk}>
            OK
          </Button>,
        ]}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Send Notification</h2>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="notificationTitle">Title:</label>
            <Input
              id="notificationTitle"
              value={notificationTitle}
              onChange={(e) => setNotificationTitle(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="notificationMessage">Message:</label>
            <Input.TextArea
              id="notificationMessage"
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
