/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "~/src/api/firebase-config";
import Card from "~/src/components/Card";
import styles from "./Gamemode.module.css";
// import { faStar as star_regular } from "@fortawesome/free-regular-svg-icons";
import {
  // faStar as star_solid,
  faShuffle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatusMessage from "~/src/components/StatusMessage";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import useAuth from "~/src/hooks/useAuth";
import Comments from "~/src/components/Comments";

const COL_NAME = "flashcardset";

// Fisher-Yates Sorting Algorithm
const shuffle = (array: Array<any>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const putLast = (array: Array<any>, index: number) => {
  const newArray = [...array];
  const card = newArray[index];
  for (let i = index; i < newArray.length - 1; i++) {
    newArray[i] = newArray[i + 1];
  }
  newArray[newArray.length - 1] = card;
  return newArray;
};

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const percentage = (currentStep / totalSteps) * 100;
  const formattedPercentage = parseFloat(percentage.toFixed(0));
  return formattedPercentage + "%";
};

const Gamemode = () => {
  const { id } = useParams();
  const [index, setIndex] = useState<number>(0);
  // const [isFavourite, setIsFavourite] = useState(false); // TODO: check default with db
  const [isShuffle, setIsShuffle] = useState(false);
  const [defaultCards, setDefaultCards] = useState<Array<any>>([]);
  const [cards, setCards] = useState<Array<any>>([]);
  const [difficultCards, setDifficultCards] = useState<number>(0);
  const currentStep = index + 1;
  const totalSteps = cards.length;
  const percentage = (currentStep / totalSteps) * 100;
  const formattedPercentage = parseFloat(percentage.toFixed(0));
  const [isLiked, setIsLiked] = useState(false);
  const user = useAuth();

  const getSetQuery = useQuery({
    queryKey: ["set", id],
    queryFn: () => getDoc(doc(db, COL_NAME, id || "")),
  });

  // Add data from server to cards and defaultCards
  useEffect(() => {
    if (getSetQuery.isSuccess) {
      const cards: Array<any> = [];
      getSetQuery.data.data()?.cards.forEach((card: any) => cards.push(card));
      setCards(cards);
      setDefaultCards(cards);
      setIsLiked(getSetQuery.data.data()?.likes?.includes(user?.email));
    }
  }, [getSetQuery.isSuccess, getSetQuery.data, user?.email]);

  const handleShuffle = () => {
    const def = [...defaultCards];
    setCards(isShuffle ? def : shuffle(def));
    setIndex(0);
    setIsShuffle(!isShuffle);
  };

  const markDiffucult = () => {
    setCards(putLast(cards, index));
    if (index < cards.length - difficultCards) {
      setDifficultCards((prev) => prev + 1);
    }
  };

  const markLike = async () => {
    if (isLiked) {
      if (id) {
        const set = doc(db, "flashcardset", id);
        await updateDoc(set, {
          likes: arrayRemove(user?.email),
        });
        setIsLiked(!isLiked);
      }
    } else if (id) {
      const set = doc(db, "flashcardset", id);
      await updateDoc(set, {
        likes: arrayUnion(user?.email),
      });
      setIsLiked(!isLiked);
    }
  };
  useEffect(() => {
    console.log(getSetQuery.data?.data()?.comments);
  }, [getSetQuery.data]);

  if (getSetQuery.isLoading) {
    return <StatusMessage loading />;
  }

  if (getSetQuery.status === "error") {
    return <StatusMessage error message={getSetQuery.error.message} />;
  }

  if (!getSetQuery.data?.exists) {
    return <StatusMessage error message="Missing data" />;
  }

  if (!cards || cards.length < 1) {
    return <StatusMessage error message="Undefined cards" />;
  }

  return (
    <div className={styles.gamemode}>
      <h2>{getSetQuery.data.data()?.title}</h2>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${formattedPercentage}%` }}
        ></div>
      </div>
      <div className={styles.controls}>
        <div /> {/* Empty div for alignment purposes */}
        <p className={styles.count}>
          {index + 1} / {getSetQuery.data.data()?.cards.length}
        </p>
        <div className={styles.icons}>
          <FontAwesomeIcon
            size="2x"
            icon={faShuffle}
            className={isShuffle ? styles.isShuffle : ""}
            onClick={handleShuffle}
          />
          {/* <FontAwesomeIcon
            size="2x"
            icon={isFavourite ? star_solid : star_regular}
            className={isFavourite ? styles.isFavourite : ""}
            onClick={() => setIsFavourite(!isFavourite)}
          /> */}
          <FontAwesomeIcon
            size="2x"
            icon={faExclamationTriangle}
            className={
              index >= cards.length - difficultCards ? styles.isDifficult : ""
            }
            onClick={markDiffucult}
          />
          <FontAwesomeIcon
            icon={isLiked ? heartSolid : heartRegular}
            className={isLiked ? styles.likeButton : ""}
            onClick={markLike}
            size="2x"
          />
        </div>
      </div>

      <Card
        card={cards[index]}
        updateIndex={setIndex}
        isFirst={index === 0}
        isLast={index === getSetQuery.data.data()?.cards.length - 1}
      />

      <Comments
        comments={getSetQuery.data.data()?.comments}
        id={getSetQuery.data.id}
      />
    </div>
  );
};
export default Gamemode;
