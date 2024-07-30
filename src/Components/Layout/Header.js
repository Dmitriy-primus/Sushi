import styles from "./Header.module.css";
import Image from "../../assets/sushi.jpg";
import React from "react";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Япона кухня</h1>
        <HeaderCartButton onCart={props.onVisible} />
      </header>
      <div className={styles["main-image"]}>
        <img src={Image} alt="Блюдо японской кухни" />
      </div>
    </React.Fragment>
  );
};

export default Header;
