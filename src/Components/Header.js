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
import {
  GetReviews,
  NotifyEveryone,
  setImage,
  setIsModalVisible,
} from "../Features/kitchenSlice";
import { selectKitchen, useAppSelector, useAppDispatch } from "../Store/store";
import { baseURL } from "../Features/utils";

function Header() {
  // const { userData, auth } = useMenuContext();
  const dispatch = useAppDispatch();
  const { userData, auth, reviews, image, isModalVisible } =
    useAppSelector(selectKitchen);
  // const [totalReviews, setTotalReviews] = useState(0);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
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

  useEffect(() => {
    dispatch(setImage(`${baseURL}Uploads/${userData?.KitchenImage}`));
  }, [image]);
  console.log("Image: ", image);

  const handleBellIconClick = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    const isBasicStaff = userData.Role === "basic";
    const kitchenId = isBasicStaff ? userData.KitchenId : userData.Id;
    const payload = {
      KitchenId: kitchenId,
      Title: notificationTitle,
      UserId: "abcd",
      Message: notificationMessage,
    };

    dispatch(NotifyEveryone(payload));
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
      <Image src={image} style={imageStyle} />
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
