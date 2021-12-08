import React, { useState, useEffect, useContext } from "react";

import RealmContext from "../../../contexts/RealmContext";

import { ObjectId } from "bson";

import { v4 as uuidv4 } from "uuid";

import Modal from "react-modal";

import Container from "../../../components/Container";
import AddItemContainer from "../../../components/AddItemContainer";
import CustomModal from "../../../components/Modal";
import TitleAndIconClose from "../../../components/Modal/titleAndIconClose";
import TextAndComponentContainer from "../../../components/Modal/textAndComponentContainer";
import Input from "../../../components/Input";
import SubmitBottomButtons from "../../../components/Modal/submitBottomButtons";
import MenuIcon from "../../../components/MenuIcon";

import { useParams } from "react-router-dom";

import { courseColors } from "../../../utils";

import "./FlashCards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

Modal.setAppElement("#root");
const FlashCards = () => {
  let { user, courseName, courseId } = useParams();

  const { realmApp, setRealmApp, realm, setRealm } = useContext(RealmContext);

  const [courseColor, setCourseColor] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const [editFlashCard, setEditFlashCard] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [openModalFalshCard, setOpenModalFlashCard] = useState(false);

  const onRotate = () => setIsRotated((rotated) => !rotated);

  const [userFlashCards, setUserFlashCards] = useState([]);

  const [courseFlashCards, setCourseFlashCards] = useState(false);

  const [flashCardToEditId, setFlashCardToEditId] = useState("");

  const [flashCardName, setFlashCardName] = useState("");
  const [flashCardQuestion, setFlashCardQuestion] = useState("");
  const [flashCardAnswer, setFlashCardAnswer] = useState("");

  const [frontCard, setFrontCard] = useState("");
  const [frontCardImageUrl, setFrontCardImageUrl] = useState("");
  const [backCard, setBackCard] = useState("");
  const [backCardImage, setBackCardImage] = useState("");

  const handleCreateNewFlashCard = async (e) => {
    e.preventDefault();
    
    try {
      realm.write(() => {
        const courseToAddFlashCard = realm.objectForPrimaryKey(
          "Course",
          ObjectId(courseId)
        );
        courseToAddFlashCard.flashCards.push({
          id: `flash-card-${uuidv4()}`,
          name: flashCardName,
          question: flashCardQuestion,
          answer: flashCardAnswer,
        });
      });
      setCourseFlashCards(!courseFlashCards);
      setOpenModal(false);
    } catch (error) {
      console.log("ERR ON CREATE FLASH CARD", error);
    }
  };

  const handleDeleteFlashCard = async (cardId) => {
    
    try {
      realm.write(() => {
        const coursefound = realm.objectForPrimaryKey(
          "Course",
          ObjectId(courseId)
        );

        let removedFlashCard = [];
        removedFlashCard = coursefound.flashCards.filter(
          (item) => item.id !== cardId
        );

        console.log("REMOVEDFlashCard", removedFlashCard);

        let removedFlashCard_helper = [];

        removedFlashCard.map((item) =>
          removedFlashCard_helper.push({
            id: item.id,
            name: item.name,
            question: item.question,
            answer: item.answer,
          })
        );

        console.log("removedFlashCard_helper", removedFlashCard_helper);

        coursefound.flashCards = removedFlashCard_helper;
      });
    } catch (error) {
      console.log("ERR", error);
    }
    setCourseFlashCards(!courseFlashCards);
  };

  const handleEditFlashCard = async (cardId) => {
    
    const foundFlashCard = userFlashCards.find((item) => item.id === cardId);

    try {
      realm.write(() => {
        foundFlashCard.name = flashCardName;
        foundFlashCard.question = flashCardQuestion;
        foundFlashCard.answer = flashCardAnswer;
      });
      setCourseFlashCards(!courseFlashCards);
    } catch (error) {
      console.log("ERR", error);
    }
    setOpenModal(false)
  };

  const refreshFlashCards = async (_) => {
        try {
      realm.write(() => {
        const coursefound = realm.objectForPrimaryKey(
          "Course",
          ObjectId(courseId)
        );

        setUserFlashCards(coursefound.flashCards);
      });
    } catch (error) {
      console.log("ERR", error);
    }
  };

  useEffect(() => {
    refreshFlashCards();
    console.log("REFRESH FLASHCARDS");
  }, [courseFlashCards]);

  return (
    <Container
      navTitle={`Study - Flash Cards - ${courseName}`}
      returnScreen="/flash-cards"
    >
      <div className="container">
        <AddItemContainer
          itemAreaText="Flash Cards"
          onPressFunction={() => {
            setOpenModal(true);
            setEditFlashCard(false);
            setFlashCardToEditId("");
            setFlashCardName("");
            setFlashCardQuestion('');
            setFlashCardAnswer('');

            setFrontCard("");
            setFrontCardImageUrl("");
            setBackCard("");
            setBackCardImage("");
          }}
          buttonText="New Flash Card"
        />
        <CustomModal
          open={openModal}
          customHeight="420px"
          customTop="13%"
          overlayClick={(value) => setOpenModal(value)}
          content={
            <div
              style={{
                // backgroundColor: 'steelblue',
                height: "100%",
              }}
            >
              <TitleAndIconClose
                modalTitle="Create New Flash Card"
                closeModal={(value) => setOpenModal(value)}
              />
              <div style={{ paddingLeft: 25, paddingRight: 25 }}>
                <TextAndComponentContainer>
                  <text>Name</text>
                  <Input
                    inputValue={flashCardName}
                    examplePlaceHolder="Ej. Segunda Guerra Mundial"
                    inputValueFunction={(e) => setFlashCardName(e.target.value)}
                    inputType="text"
                  />
                </TextAndComponentContainer>

                <TextAndComponentContainer>
                  <text>Front Card Quest</text>
                  <Input
                    inputValue={flashCardQuestion}
                    examplePlaceHolder="Ej. ¿Cuando inicio?"
                    inputValueFunction={(e) =>
                      setFlashCardQuestion(e.target.value)
                    }
                    inputType="text"
                  />
                </TextAndComponentContainer>

                <TextAndComponentContainer>
                  <text>Front Card Image URL</text>
                  <Input
                    inputValue={frontCardImageUrl}
                    examplePlaceHolder="https//www.image.org"
                    inputValueFunction={(e) =>
                      setFrontCardImageUrl(e.target.value)
                    }
                    inputType="text"
                  />
                </TextAndComponentContainer>

                <TextAndComponentContainer>
                  <text>Back Card Answ</text>
                  <Input
                    inputValue={flashCardAnswer}
                    examplePlaceHolder="Ej. 1939"
                    inputValueFunction={(e) =>
                      setFlashCardAnswer(e.target.value)
                    }
                    inputType="text"
                  />
                </TextAndComponentContainer>

                <TextAndComponentContainer>
                  <text>Back Card Image URL</text>
                  <Input
                    inputValue={backCardImage}
                    examplePlaceHolder="https//www.image.org"
                    inputValueFunction={(e) => setBackCardImage(e.target.value)}
                    inputType="text"
                  />
                </TextAndComponentContainer>

                <SubmitBottomButtons
                  cancelFunction={() => setOpenModal(false)}
                  submitFunction={(e) =>
                    editFlashCard
                      ? handleEditFlashCard(flashCardToEditId)
                      : handleCreateNewFlashCard(e)}
                  submitButtonText={editFlashCard ? "Editar" : "Crear"}
                  submitBg="lightblue"
                />
              </div>
            </div>
          }
        />
        <div className="flash_cards_container">
          {userFlashCards.map((item) => (
            <div className="flash_card">
              <div className="flash_card_header">
                <div
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${courseColors[courseColor].color1}, ${courseColors[courseColor].color2} 70%)`,
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    color: "white",
                  }}
                >
                  {courseName}
                </div>
                <MenuIcon
                  elementName="Flash Card"
                  iconColor="black"
                  onClickMenuIcon={() => {
                    setFlashCardName(item.name);
                    setFlashCardQuestion(item.front);
                    setFlashCardAnswer(item.back);
                  }}
                  onClickDelete={() => handleDeleteFlashCard(item.id)}
                  onClickEdit={() => {
                    setOpenModal(true);
                    setFlashCardToEditId(item.id);
                    setEditFlashCard(true);
                    // handleUpdateAndSaveNotification(item.id);
                    setFlashCardName(item.name);
                    setFlashCardQuestion(item.front);
                    setFlashCardAnswer(item.back);
                  }}
                />
              </div>
              {/* <Link
                to={`/${user}/study/flash-cards/${courseName}/${courseId}/${item._id}`}
              >
              </Link> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "150px",
                }}
                onClick={() => {
                  setOpenModalFlashCard(true);
                  setIsRotated(false);
                  setFlashCardName(item.name);
                  setFrontCard(item.front);
                  setFrontCardImageUrl(item.frontImg);
                  setBackCard(item.back);
                  setBackCardImage(item.backImg);
                }}
              >
                {item.name}
              </div>
            </div>
          ))}
          <Modal
            isOpen={openModalFalshCard}
            // onRequestClose={() => setOpenModalFlashCard(false)}
            className={`card ${isRotated ? "rotated" : ""}`}
            style={{
              overlay: {
                zIndex: 1005,
                backgroundColor: "rgba(237, 235, 234, 0.8)",
              },
            }}
          >
            <div className="front">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "lightpink",
                  width: "90%",
                  alignItems: "center",
                }}
              >
                <div>Front</div>
                <FontAwesomeIcon
                  icon="times"
                  size="2x"
                  onClick={() => setOpenModalFlashCard(false)}
                />
              </div>
              <div
                style={{
                  backgroundColor: "red",
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <h2>{flashCardName}</h2>
                <h3>{frontCard}</h3>
              </div>
              <img
                style={{
                  backgroundColor: "blue",
                  width: "200px",
                }}
                src={frontCardImageUrl}
                alt={flashCardName}
              />
              <FontAwesomeIcon icon="redo" onClick={onRotate} />
            </div>
            <div className="back">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "lightpink",
                  width: "90%",
                  alignItems: "center",
                }}
              >
                <div>Back</div>
                <FontAwesomeIcon
                  icon="times"
                  size="2x"
                  onClick={() => setOpenModalFlashCard(false)}
                />
              </div>
              <div
                style={{
                  backgroundColor: "red",
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <h3>{backCard}</h3>
              </div>
              <img
                style={{
                  backgroundColor: "blue",
                  width: "200px",
                }}
                src={backCardImage}
                alt={flashCardName}
              />
              <FontAwesomeIcon icon="redo" onClick={onRotate} />
            </div>
          </Modal>
        </div>
      </div>
    </Container>
  );
};

export default FlashCards;
