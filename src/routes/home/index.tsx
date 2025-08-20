import { getAllSets } from "~/src/api/flashcards";
import { useQuery } from "@tanstack/react-query";
import styles from "./Home.module.css";
import { Link, useSearchParams } from "react-router-dom";
import Button from "~/src/components/Button";
import Marquee from "react-fast-marquee";
import cx from "classnames";
import SetLink from "~/src/components/SetLink";
import CreatableSelect from "react-select/creatable";
import { SIMPLE_SUBJECTS } from "~/src/constants";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search"));
  const [filterQuery, setFilterQuery] = useState(searchParams.get("subjects"));

  const flashcardsQuery = useQuery({
    queryKey: ["flashcards"],
    queryFn: getAllSets,
  });

  const isInSearch = (value: string) => {
    return (value || "")
      .toLowerCase()
      .includes(searchParams.get("search")?.toLowerCase() || "");
  };

  const isInSubjects = (value: string) => {
    if (searchParams.get("subjects") === null) return true;
    return searchParams.get("subjects")?.includes(value) || false;
  };

  useEffect(() => {
    setSearchParams({
      ...(searchQuery && { search: searchQuery }),
      ...(filterQuery && { subjects: filterQuery }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filterQuery]);

  return (
    <div className={styles.home}>
      <div className={styles.setsContainer} id="sets">
        <h2>View popular sets..</h2>

        <div id="setList" className={styles.setList}>
          {flashcardsQuery.status === "success" &&
            flashcardsQuery.data
              .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
              .filter((set) => !set.isPrivate)
              .slice(0, 3)
              .map((set) => <SetLink set={set} key={set._id} />)}
        </div>

        <h2>..explore community sets..</h2>

        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="text"
              className={styles.search}
              value={searchParams.get("search") || ""}
              onChange={(event) => {
                setSearchQuery(event.target.value);
              }}
            />
          </div>
          <CreatableSelect
            isMulti
            isClearable
            className={styles.filterSubjects}
            placeholder="Filter by subject"
            options={SIMPLE_SUBJECTS.map((subject) => ({
              value: subject.value,
              label: subject.value,
            }))}
            value={SIMPLE_SUBJECTS.filter((subject) =>
              (searchParams.get("subjects") || "").includes(subject.value),
            )}
            onChange={(selected): void => {
              setFilterQuery(selected.map((s) => s.value).join(" "));
            }}
          />
        </div>

        <div id="setList" className={styles.setList}>
          {flashcardsQuery.status === "success" &&
            flashcardsQuery.data
              .filter((set) => !set.isPrivate)
              .filter(
                (set) =>
                  isInSearch(set.title) ||
                  isInSearch(set.description) ||
                  isInSearch(set.createdBy),
              )
              .filter((set) => isInSubjects(set.subject))
              .map((set) => <SetLink set={set} key={set._id} />)}
        </div>

        {/* <Button>BROWSE MORE</Button> */}
      </div>

      <div className={cx(styles.infoContainer, styles.blueBg)}>
        <h2>..or create your own!</h2>

        <Link to="/new" style={{ margin: "1rem" }}>
          <Button inverted>NEW SET</Button>
        </Link>
        <p className={styles.ps}>*Requires user creation</p>
      </div>

      <div className={styles.infoContainer}>
        <h2>
          Not <i>registered</i> yet?
        </h2>
        <p>
          Sign up now to take advantage of Flashy's personalized customization
          and storage features, which make learning more efficient and
          accessible anytime, anywhere.
        </p>
        <Link to="/signup">
          <Button duration={0.35}>SIGN UP</Button>
        </Link>
      </div>

      <div className={styles.infoContainer}>
        <h2>What users are saying!</h2>
        <Marquee
          className={styles.marquee}
          direction="left"
          speed={60}
          gradient
          gradientWidth={100}
        >
          <div className={cx(styles.feedback, styles.purple)}>
            <p>
              "Flashy's interactive features have transformed my study routine!"
            </p>
            <p className={styles.by}>- Sarah J.</p>
          </div>
          <div className={cx(styles.feedback, styles.green)}>
            <p>"The variety of learning sets available is impressive!"</p>
            <p className={styles.by}>- Alex M.</p>
          </div>
          <div className={cx(styles.feedback, styles.yellow)}>
            <p>
              "Being able to access my flashcards from any device is a
              game-changer."
            </p>
            <p className={styles.by}>- Max R.</p>
          </div>
          <div className={cx(styles.feedback, styles.blue)}>
            <p>
              "As teacher, I love using Flashy to create custom flashcards for
              my students."
            </p>
            <p className={styles.by}>- Emily T.</p>
          </div>
        </Marquee>
        <Marquee
          className={styles.marquee}
          direction="right"
          speed={50}
          gradient
          gradientWidth={100}
        >
          <div className={cx(styles.feedback, styles.purple)}>
            <p>
              "Flashy's interactive features have transformed my study routine!"
            </p>
            <p className={styles.by}>- Sarah J.</p>
          </div>
          <div className={cx(styles.feedback, styles.blue)}>
            <p>
              "As teacher, I love using Flashy to create custom flashcards for
              my students."
            </p>
            <p className={styles.by}>- Emily T.</p>
          </div>
          <div className={cx(styles.feedback, styles.yellow)}>
            <p>
              "Being able to access my flashcards from any device is a
              game-changer."
            </p>
            <p className={styles.by}>- Max R.</p>
          </div>
          <div className={cx(styles.feedback, styles.green)}>
            <p>"The variety of learning sets available is impressive!"</p>
            <p className={styles.by}>- Alex M.</p>
          </div>
        </Marquee>
        <Marquee
          className={styles.marquee}
          direction="left"
          speed={70}
          gradient
          gradientWidth={100}
        >
          <div className={cx(styles.feedback, styles.yellow)}>
            <p>
              "Being able to access my flashcards from any device is a
              game-changer."
            </p>
            <p className={styles.by}>- Max R.</p>
          </div>
          <div className={cx(styles.feedback, styles.green)}>
            <p>"The variety of learning sets available is impressive!"</p>
            <p className={styles.by}>- Alex M.</p>
          </div>
          <div className={cx(styles.feedback, styles.blue)}>
            <p>
              "As teacher, I love using Flashy to create custom flashcards for
              my students."
            </p>
            <p className={styles.by}>- Emily T.</p>
          </div>
          <div className={cx(styles.feedback, styles.purple)}>
            <p>
              "Flashy's interactive features have transformed my study routine!"
            </p>
            <p className={styles.by}>- Sarah J.</p>
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Home;
