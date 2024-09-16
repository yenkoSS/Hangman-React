import Container from "./Container";
import Title from "./Title";
import Poster from "./Poster";

import image0 from "../src/img/0lives.png";
import image1 from "../src/img/1lives.png";
import image2 from "../src/img/2lives.png";
import image3 from "../src/img/3lives.png";
import image4 from "../src/img/4lives.png";
import image5 from "../src/img/5lives.png";
import image6 from "../src/img/6lives.png";
import reactIcon from "../src/img/logo192.png";
import Text from "./Text";
import ButtonsContainer from "./ButtonsContainer";
import Button from "./Button";
import DisplayWord from "./DisplayWord";
import UsedLetters from "./UsedLetters";
import Form from "./Form";
import Footer from "./Footer";
import TitleBox from "./TitleBox";
import { useReducer, useEffect, useRef } from "react";

const initialState = {
  gameStage: "menu",
  input: "",
  lives: 6,
  word: "",
  displayWord: "",
  usedLetters: "",
  error: undefined,
};

function reducer(state, action) {
  switch (action.type) {
    case "menu": {
      return { ...state, gameStage: "menu" };
    }

    case "won": {
      return { ...state, gameStage: "won", displayWord: "" };
    }

    case "gameOver": {
      return { ...state, gameStage: "gameOver", displayWord: "" };
    }

    case "wrongLetter": {
      return { ...state, lives: state.lives - 1 };
    }

    case "reset": {
      return { ...initialState };
    }

    case "playing": {
      return {
        ...state,
        gameStage: "playing",
        word: action.payload.randomWord,
        displayWord: action.payload.hiddenWord,
      };
    }

    case "setLetter": {
      return { ...state, input: action.payload };
    }

    case "resetLetter": {
      return { ...state, input: "" };
    }

    case "addLetter": {
      return {
        ...state,
        error: undefined,
        usedLetters: action.payload,
        input: "",
      };
    }

    case "error": {
      return { ...state, error: action.payload, input: "" };
    }

    case "renderWord": {
      return { ...state, displayWord: action.payload };
    }

    default: {
      return { ...state };
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const triggerEffect = useRef(false);

  useEffect(() => {
    if (triggerEffect.current) {
      function isWon() {
        if (state.displayWord === state.word) {
          dispatch({ type: "won" });
        } else {
          return;
        }
      }
      isWon();
    } else {
      triggerEffect.current = true;
      return;
    }
  }, [state.displayWord]);

  useEffect(() => {
    if (triggerEffect.current) {
      function isDead() {
        if (state.lives === 0) {
          dispatch({ type: "gameOver" });
        } else {
          return;
        }
      }
      isDead();
    } else {
      triggerEffect.current = true;
      return;
    }
  }, [state.lives]);

  function selectRandomWord(difficulty) {
    const words = [
      "mechanic",
      "root",
      "kitchen",
      "bedroom",
      "robot",
      "apple",
      "banana",
      "cherry",
      "dragonfruit",
      "elephant",
      "giraffe",
      "happiness",
      "island",
      "jungle",
      "kangaroo",
      "library",
      "mountain",
      "notebook",
      "ocean",
      "pyramid",
      "quicksand",
      "rainbow",
      "strawberry",
      "tiger",
      "umbrella",
      "volcano",
      "waterfall",
      "xylophone",
      "yogurt",
      "zebra",
    ];

    if (difficulty === "easy") {
      const easyWords = words.filter((word) => word.length <= 4);

      const randomWord =
        easyWords[Math.floor(Math.random() * easyWords.length)];

      return randomWord;
    }

    if (difficulty === "medium") {
      const mediumWords = words.filter(
        (word) => word.length > 4 && word.length <= 8
      );

      const randomWord =
        mediumWords[Math.floor(Math.random() * mediumWords.length)];

      return randomWord;
    }

    if (difficulty === "hard") {
      const hardWords = words.filter((word) => word.length > 8);

      const randomWord =
        hardWords[Math.floor(Math.random() * hardWords.length)];

      return randomWord;
    }
  }

  function generateHiddenWord(word) {
    let hiddenWordArray = [];
    for (let i = 0; i < word.length; i++) {
      hiddenWordArray.push("_");
    }
    const hiddenWord = hiddenWordArray.join("");
    return hiddenWord;
  }

  const isUsed = (value, usedLettersList) =>
    usedLettersList.includes(value) ? true : false;

  const isEmpty = (value) => (value === "" ? true : false);

  function isString(value) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(value);
  }

  const checkLenght = (value) => (value.length > 1 ? false : true);
  /*
  function checkInput(value) {
    if (isEmpty(value)) {
      dispatch({ type: "error", payload: "You must enter a letter." });
    } else if (!isString(value)) {
      dispatch({ type: "error", payload: "Invalid letter." });
    } else if (isUsed(value, state.usedLetters)) {
      dispatch({ type: "error", payload: "You used this letter already." });
    } else {
      const usedLettersList = addLetterToList(state.input, state.usedLetters);
      dispatch({ type: "addLetter", payload: usedLettersList });
    }
  }
*/
  function checkInput(value) {
    if (isEmpty(value)) {
      return { error: true, message: "You must provide a letter." };
    } else if (!isString(value)) {
      return { error: true, message: "Invalid letter" };
    } else if (isUsed(value, state.usedLetters)) {
      return { error: true, message: "Used." };
    } else if (!checkLenght(value)) {
      return { error: true, message: "You can enter only one letter." };
    } else {
      return { error: false };
    }
  }

  function addLetterToList(letter, string) {
    if (string.length === 0) {
      let tempArray = string.split("");
      tempArray.push(letter);
      return tempArray.join("");
    } else {
      let tempArray = string.split(", ");
      tempArray.push(letter);
      return tempArray.join(", ");
    }
  }

  function updateDisplayWord(letter, word, hiddenWord) {
    let indexes = [];

    hiddenWord = hiddenWord.split("");
    for (let i = 0; i <= word.length; i++) {
      if (word[i] === letter) {
        indexes.push(i);
      }
    }

    for (let i = 0; i <= indexes.length; i++) {
      hiddenWord[indexes[i]] = letter;
    }

    hiddenWord = hiddenWord.join("");
    return hiddenWord;
  }

  function selectImage(lives) {
    if (lives === 6) {
      return image6;
    } else if (lives === 5) {
      return image5;
    } else if (lives === 4) {
      return image4;
    } else if (lives === 3) {
      return image3;
    } else if (lives === 2) {
      return image2;
    } else if (lives === 1) {
      return image1;
    } else if (lives === 0) {
      return image0;
    }
  }

  function submitForm(e) {
    e.preventDefault();
    const isValid = checkInput(state.input);
    if (isValid.error) {
      dispatch({ type: "error", payload: isValid.message });
    } else {
      if (state.word.includes(state.input)) {
        const updatedDisplayWord = updateDisplayWord(
          state.input,
          state.word,
          state.displayWord
        );
        dispatch({ type: "renderWord", payload: updatedDisplayWord });
      } else if (state.word === state.displayWord) {
        dispatch({ type: "won" });
      } else {
        dispatch({ type: "wrongLetter" });
      }

      const usedLettersList = addLetterToList(state.input, state.usedLetters);
      dispatch({ type: "addLetter", payload: usedLettersList });
    }

    e.preventDefault();
  }

  function startGame(difficulty) {
    const randomWord = selectRandomWord(difficulty);
    const hiddenWord = generateHiddenWord(randomWord);
    dispatch({ type: "playing", payload: { randomWord, hiddenWord } });
  }

  return (
    <>
      <Container>
        <TitleBox>
          <Title name="Hangman!"></Title>
          <img className="img-react" src={reactIcon}></img>
        </TitleBox>

        <Poster image={selectImage(state.lives)} />
        {state.gameStage === "menu" && (
          <>
            <Text text="Select difficulty:" className="text-muted" />

            <ButtonsContainer>
              <Button onClick={() => startGame("easy")} value={"Easy"} />
              <Button onClick={() => startGame("medium")} value={"Medium"} />
              <Button onClick={() => startGame("hard")} value={"Hard"} />
            </ButtonsContainer>
          </>
        )}
        {state.gameStage === "playing" && (
          <>
            <DisplayWord word={state.displayWord} />
            <UsedLetters usedletters={state.usedLetters} />

            <Form
              submitFn={(e) => submitForm(e)}
              input={state.input}
              dispatch={dispatch}
            >
              <Button value="Check" />
            </Form>
            {state.error && <Text text={state.error} className="text-error" />}
          </>
        )}
        {state.gameStage === "won" && (
          <>
            <Text
              className="text-win"
              text={`Congratulations! The word is: ${state.word}`}
            >
              Congratulations!
            </Text>
            <Button
              onClick={() => dispatch({ type: "reset" })}
              value={"PLay again"}
            />
          </>
        )}
        {state.gameStage === "gameOver" && (
          <>
            <Text
              className="text-dead"
              text={`You're dead. The correct word was: ${state.word}`}
            ></Text>
            <Button
              onClick={() => dispatch({ type: "reset" })}
              value={"PLay again"}
            />
          </>
        )}
        <Footer />
      </Container>
    </>
  );
}

export default App;
