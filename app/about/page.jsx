import Link from "next/link";

import styles from "@/app/styles/about.module.css";
import RoundBtn from "../components/common/RoundBtn";
import { about } from "@/data/about";

const About = () => {
  return (
    <div className={styles.about}>
      {/* Header */}
      <div className={styles.header}>FRANKIE DEV SLN</div>
      {/* Content */}
      <div className={styles.content}>
        {/* About */}
        <div className={styles.aboutMe}>
          <h1>{about.aboutTitle}</h1>
          <p>{about.aboutText}</p>
        </div>
        {/* My journey */}
        <div className={styles.journey}>
          <h1>{about.journeyTitle}</h1>
          <p>{about.journeyText}</p>
        </div>
        {/* Experience */}
        <div className={styles.experience}>
          <h1>{about.experienceTitle}</h1>
          <p>{about.experienceText}</p>
        </div>
        {/* Projects */}
        <div className={styles.projects}>
          {/* Heading */}
          <div className={styles.heading}>
            <h1>{about.projectsTitle}</h1>
            <p>{about.projectsText}</p>
          </div>
          {/* Projects list */}
          <div className={styles.list}>
            {about.projects.map((project, index) => (
              <div key={index} className={styles.project}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Clients */}
        <div className={styles.clients}>
          <div>
            <h1>{about.clientsTitle}</h1>
            <p>{about.clientsText}</p>
          </div>
          {about.clients.map((client, index) => (
            <div key={index} className={styles.client}>
              <h3>{client.title}</h3>
              <p>{client.description}</p>
            </div>
          ))}
        </div>
        {/* Learning */}
        <div className={styles.learning}>
          <h1>{about.learningTitle}</h1>
          <p>{about.learningText}</p>
        </div>
        {/* Connect */}
        <div className={styles.connect}>
          <h1>{about.connectTitle}</h1>
          <p>{about.connectText}</p>
        </div>
      </div>
      {/* Contacts */}
      <div className={styles.contacts}>
        <Link className={styles.link} href="mailto:franklinekibet777@email.com">
          Email me
        </Link>
        <Link className={styles.link} href="tel:+254721201236">
          Call me
        </Link>
        <Link className={styles.link} href="https://www.google.com/">
          Google
        </Link>
      </div>
      {/* Back to top */}
      <RoundBtn text="<<Back to Home" link="/" customClass={styles.backBtn} />
    </div>
  );
};

export default About;
