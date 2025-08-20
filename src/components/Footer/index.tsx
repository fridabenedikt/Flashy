import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.love}>
        <p>Made with</p>
        <FontAwesomeIcon icon={faHeart} />
        <p>by gruppe 41</p>
      </div>
    </div>
  );
};

export default Footer;
