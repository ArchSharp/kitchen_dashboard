import React, { useState, useEffect } from "react";
import "./Reviews.css";
import {
  HeartOutlined,
  DislikeOutlined,
  HeartFilled,
  DislikeFilled,
  SendOutlined,
} from "@ant-design/icons";
import moment from "moment/moment";
import profileUserImage from "../../../Components/Think.jpeg";
import { GetReviews } from "../../../Features/kitchenSlice";
import {
  selectKitchen,
  useAppSelector,
  useAppDispatch,
} from "../../../Store/store";

function Reviews() {
  const dispatch = useAppDispatch();
  const { userData, reviews } = useAppSelector(selectKitchen);

  const [likedReviews, setLikedReviews] = useState({});
  const [dislikedReviews, setDislikedReviews] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [newCommentUserImage, setNewCommentUserImage] =
    useState(profileUserImage);
  const [hasReviews, setHasReviews] = useState(false);

  useEffect(() => {
    if (!reviews) {
      const isBasicStaff = userData.Role === "basic";
      const kitchenId = isBasicStaff ? userData.KitchenId : userData.Id;
      dispatch(GetReviews(kitchenId));
    }
  }, [reviews]);

  function formatTimestampToDateString(timestamp) {
    const date = new Date(timestamp);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
  }

  const handleLikeClick = (index) => {
    const updatedReviews = [...reviews];
    if (!likedReviews[index]) {
      updatedReviews[index].likeCount += 1;
      updatedReviews[index].dislikeCount -= dislikedReviews[index] ? 1 : 0;
      setLikedReviews({ ...likedReviews, [index]: true });
      setDislikedReviews({ ...dislikedReviews, [index]: false });
    } else {
      updatedReviews[index].likeCount -= 1;
      setLikedReviews({ ...likedReviews, [index]: false });
    }
  };

  const handleDislikeClick = (index) => {
    const updatedReviews = [...reviews];
    if (!dislikedReviews[index]) {
      updatedReviews[index].dislikeCount += 1;
      updatedReviews[index].likeCount -= likedReviews[index] ? 1 : 0;
      setDislikedReviews({ ...dislikedReviews, [index]: true });
      setLikedReviews({ ...likedReviews, [index]: false });
    } else {
      updatedReviews[index].dislikeCount -= 1;
      setDislikedReviews({ ...dislikedReviews, [index]: false });
    }
  };

  const handleShowInputClick = () => {
    setShowInput(true);
  };

  const handleSendClick = () => {
    const timestamp = moment().format("MMMM Do YYYY, h:mm A");
    const newReviewObj = {
      Reviewer: userData.KitchenName,
      Review: newComment,
      userImage: newCommentUserImage,
      likeCount: 0,
      dislikeCount: 0,
      date: timestamp,
    };

    const updatedReviews = [...reviews, newReviewObj];

    setNewComment("");
    setShowInput(false);
    setIsButtonDisabled(true);
    setHasReviews(true);
  };

  const handleCommentInputChange = (e) => {
    const inputText = e.target.value;
    setNewComment(inputText);
    setIsButtonDisabled(inputText === "");
  };

  useEffect(() => {
    if (reviews) {
      setHasReviews(true);
    }
  }, [reviews]);

  return (
    <div className="reviews-container">
      {!reviews ? (
        // Loading component
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: "1.2rem",
            textAlign: "center",
            color: "grey",
            marginLeft: "15rem",
            marginTop: "10rem",
          }}
        >
          Loading reviews...
        </div>
      ) : hasReviews ? (
        reviews.map((review, index) => (
          <div key={index} className="review">
            <div className="user-info">
              <img
                src={newCommentUserImage}
                alt={`${review.Reviewer}'s avatar`}
              />
              <div className="user-details">
                <span className="username">{review.Reviewer}</span>
                <span className="date">
                  {moment(review.CreatedAt).format(
                    "dddd, MMMM Do YYYY, h:mm:ss a"
                  )}
                </span>
              </div>
            </div>
            <p className="review-content">{review.Review}</p>
            <div className="review-actions">
              <span
                className={`like-count ${likedReviews[index] ? "active" : ""}`}
              >
                {likedReviews[index] ? (
                  <>
                    <HeartFilled
                      style={{ color: "#c45628" }}
                    />
                    <span
                      style={{ color: "#c45628", fontFamily: "sans-serif" }}
                    >
                      {review.AgreeCount}
                    </span>
                  </>
                ) : (
                  <>
                    <HeartOutlined/>
                    <span style={{ fontFamily: "sans-serif" }}>
                      {review.AgreeCount}
                    </span>
                  </>
                )}
              </span>
              <span
                className={`dislike-count ${
                  dislikedReviews[index] ? "active" : ""
                }`}
              >
                {dislikedReviews[index] ? (
                  <>
                    <DislikeFilled
                      style={{ color: "#c45628" }}
                    />
                    <span
                      style={{ color: "#c45628", fontFamily: "sans-serif" }}
                    >
                      {review.DisagreeCount}
                    </span>
                  </>
                ) : (
                  <>
                    <DislikeOutlined
                    />
                    <span style={{ fontFamily: "sans-serif" }}>
                      {review.DisagreeCount}
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: "1.2rem",
            textAlign: "center",
            color: "grey",
            marginLeft: "15rem",
            marginTop: "10rem",
          }}
        >
          No Reviews yet, Wait for your customers to say something about you
        </div>
      )}
      {/* 
      {showInput ? (
        <div className="add-comment active">
          <div className="comment-input">
            <input
              type="text"
              placeholder="Say Something ..."
              value={newComment}
              onChange={handleCommentInputChange}
              className="input-field"
              style={{width: '20rem'}}
            />
            <button
              className={`send-button ${isButtonDisabled ? "disabled-button" : ""}`}
              onClick={handleSendClick}
              disabled={isButtonDisabled}
              style={{width: '5rem', marginBottom: '1rem'}}
            >
              <SendOutlined />
            </button>
          </div>
        </div>
      ) : (
        <button className="add-comment-button" style={{marginTop: '50%', marginLeft: '201%'}} onClick={handleShowInputClick}>
          Say Something...
        </button>
      )} */}
    </div>
  );
}

export default Reviews;
