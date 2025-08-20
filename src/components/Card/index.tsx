import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
  faAward,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Card.module.css";
import { Flashcard } from "~/src/types";

type CardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  card: Flashcard | any;
  isFirst?: boolean;
  isLast?: boolean;
  updateIndex: Dispatch<SetStateAction<number>>;
};

enum direction {
  "LEFT",
  "RIGHT",
}

const Card = ({
  card,
  isFirst = false,
  isLast = false,
  updateIndex,
}: CardProps) => {
  const [isFront, setIsFront] = useState(true);

  const handleClick = (dir?: direction) => {
    setIsFront(true);
    if (dir === direction.LEFT) {
      updateIndex((prev: number) => prev - 1);
      return;
    }
    updateIndex((prev: number) => prev + 1);
  };

  return (
    <>
      <div className={styles.box}>
        {/* TODO: Add functionality to these buttons */}

        <div
          className={cx(styles.card, {
            [styles.flipped]: !isFront,
          })}
          onClick={() => setIsFront(!isFront)}
        >
          <div className={styles.front}>
            {card.frontImage ? (
              <div className={styles.frontWithImage}>
                <p>{card.front}</p>
                <img src={card.frontImage} />
              </div>
            ) : (
              <p>{card.front}</p>
            )}
          </div>
          <div className={styles.back}>
            <p>{card.back}</p>
          </div>
        </div>
        <div className={styles.arrows}>
          <Button
            disabled={isFirst}
            onClick={() => handleClick(direction.LEFT)}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} size="2xl" />
          </Button>
          {isLast ? (
            // TODO
            <Link to="/">
              <Button>
                <FontAwesomeIcon icon={faAward} size="2xl" />
                <p>Back home</p>
              </Button>
            </Link>
          ) : (
            <Button onClick={handleClick}>
              <FontAwesomeIcon icon={faArrowRightLong} size="2xl" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
