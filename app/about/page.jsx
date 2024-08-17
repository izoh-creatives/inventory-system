import Link from "next/link";

import styles from "@/app/styles/about.module.css";
import RoundBtn from "../components/common/RoundBtn";

const About = () => {
  return (
    <div className={styles.about}>
      {/* Header */}
      <div className={styles.header}>FRANKIE DEV SLN</div>
      {/* Content */}
      <div className={styles.content}>
        {/* About */}
        <div className={styles.aboutMe}>
          <h1>About Me</h1>
          <p>
            Hello! I'm Frankline Kibet, a passionate web developer based in
            Kenya. My journey in web development began in 2022, and since then,
            I've been on an exciting learning path, constantly honing my skills
            and exploring new technologies.
          </p>
        </div>
        {/* My journey */}
        <div className={styles.journey}>
          <h1>My Journey</h1>
          <p>
            I discovered my passion for web development during a university
            course on web and internet programming. From that moment on, I dived
            into HTML5, CSS3, and JavaScript, laying the foundation for my
            career in web development.
          </p>
        </div>
        {/* Experience */}
        <div className={styles.experience}>
          <h1>Experience</h1>
          <p>
            Over the years, I've gained valuable experience working on various
            web projects, including: Building responsive and user-friendly
            websites for clients across different industries. Collaborating with
            teams to develop dynamic web applications, utilizing frameworks like
            Bootstrap, React, and Angular. Optimizing website performance and
            accessibility to ensure a seamless user experience. Implementing SEO
            best practices to improve website visibility and search engine
            rankings.
          </p>
        </div>
        {/* Projects */}
        <div className={styles.projects}>
          {/* Heading */}
          <div className={styles.heading}>
            <h1>Completed Projects</h1>
            <p>Here are some of the notable projects I have completed:</p>
          </div>
          {/* Projects list */}
          <div className={styles.list}>
            <div className={styles.project}>
              <h3>Online Store for XYZ Fashion</h3>
              <p>
                Developed a fully functional e-commerce website for XYZ Fashion,
                including product catalog, shopping cart, and secure checkout
                features.
              </p>
            </div>
            <div className={styles.project}>
              <h3>Restaurant Management System for ABC Bistro</h3>
              <p>
                Designed and implemented a restaurant management system for ABC
                Bistro with features such as table reservations, order
                management, and staff scheduling
              </p>
            </div>
            <div className={styles.project}>
              <h3>Portfolio Website for Jane Doe</h3>
              <p>
                Created a personal portfolio website for Jane Doe showcasing her
                design work, client testimonials, and contact information.
              </p>
            </div>
            <div className={styles.project}>
              <h3>Blog Platform for Tech Enthusiasts</h3>
              <p>
                Built a blog platform for tech enthusiasts to share articles,
                reviews, and tutorials, featuring user accounts, post creation,
                and comment functionality.
              </p>
            </div>
          </div>
        </div>
        {/* Clients */}
        <div className={styles.clients}>
          <div>
            <h1>Clients Using My System</h1>
            <p>
              I am proud to have worked with the following clients who are using
              my systems:
            </p>
          </div>
          <div className={styles.client}>
            <h3>XYZ Fashion</h3>
            <p>Leading online fashion retailer in Kenya.</p>
          </div>
          <div className={styles.client}>
            <h3>ABC Bistro</h3>
            <p>Popular bistro offering a wide range of delicious meals.</p>
          </div>
          <div className={styles.client}>
            <h3>Jane Doe Design Studio</h3>
            <p>Creative design studio known for innovative graphic designs.</p>
          </div>
          <div className={styles.client}>
            <h3>Tech Enthusiasts Community</h3>
            <p>
              A community platform for technology enthusiasts to connect and
              share knowledge.
            </p>
          </div>
        </div>
        {/* Learning */}
        <div className={styles.learning}>
          <h1>Continuous Learning</h1>
          <p>
            I believe that the field of web development is constantly evolving,
            and I'm committed to staying updated with the latest trends and
            technologies. Whether it's attending workshops, participating in
            online courses, or contributing to open-source projects, I'm always
            seeking opportunities to expand my knowledge and skills.
          </p>
        </div>
        {/* Connect */}
        <div className={styles.connect}>
          <h1>Let's Connect!</h1>
          <p>
            I'm passionate about collaborating on exciting web projects and
            exploring new opportunities. If you'd like to discuss a project,
            share ideas, or simply connect, feel free to reach out to me through
            my email address or connect with me on LinkedIn. I look forward to
            hearing from you!
          </p>
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
