import React from "react";
import vedio from "../../assets/Grilled steak.mp4";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <main className={styles.mainDiv}>
      <div className={styles.bgVedio}>
        <video autoPlay loop muted className={styles.bgVedioContent}>
          <source src={vedio} />

          <p>
            Your browser doesn't support HTML video. Here is a
            <a href="rabbit320.mp4">link to the video</a> instead.
          </p>
        </video>
      </div>
      <div>
        <p>this the head section..</p>
      </div>
    </main>
  );
};

export default Main;
