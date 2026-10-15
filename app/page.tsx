import Link from "next/link";
import {
  BookOpenIcon,
  ClockIcon,
  Layers3Icon,
  SparklesIcon,
  TerminalIcon,
} from "lucide-react";

import { CourseMaterials } from "@/components/course-materials";
import { CourseSyllabus } from "@/components/course-syllabus";
import { LandingCourseProgress } from "@/components/landing-course-progress";
import { LandingHeroIllustration } from "@/components/landing-hero-illustration";
import { StartCourseCta } from "@/components/start-course-cta";

import styles from "./landing.module.css";

export default function Home() {
  return (
    <div className={styles.courseHome}>
      <header className={styles.homeNav}>
        <Link href="/" className={styles.homeLogo} aria-label="Blocklearn">
          <span>
            <Layers3Icon aria-hidden />
          </span>
          <strong>Blocklearn</strong>
        </Link>
        <Link href="#path" className={styles.curriculumLink}>
          Curriculum
        </Link>
      </header>

      <main className={styles.homeMain} id="main-content" tabIndex={-1}>
        <section className={styles.courseHero}>
          <div className={styles.heroCopy}>
            <div className={styles.courseBadge}>
              <BookOpenIcon aria-hidden />
              INTERACTIVE COURSE
            </div>
            <h1 aria-label="Blocklearn">
              Block<span>learn</span>
            </h1>
            <p className={styles.courseLead}>
              Five focused chapters on how a blockchain keeps one shared
              record—clear, visual, and hands-on.
            </p>

            <div className={styles.courseBenefits}>
              <div>
                <span>
                  <ClockIcon aria-hidden />
                </span>
                <p>
                  <strong>36 minutes</strong>
                  <small>Short, focused lessons</small>
                </p>
              </div>
              <div>
                <span>
                  <TerminalIcon aria-hidden />
                </span>
                <p>
                  <strong>Interactive</strong>
                  <small>Diagrams you can change</small>
                </p>
              </div>
              <div>
                <span>
                  <SparklesIcon aria-hidden />
                </span>
                <p>
                  <strong>Learn by doing</strong>
                  <small>Test the rules yourself</small>
                </p>
              </div>
            </div>

            <div className={styles.courseStartRow}>
              <StartCourseCta className={styles.courseStart} />
              <LandingCourseProgress />
            </div>
          </div>

          <LandingHeroIllustration />
        </section>

        <section className={styles.learningPath} id="path">
          <CourseSyllabus />
          <footer className={styles.homeFooter}>
            <p>Built for the curious. No crypto or coding experience required.</p>
            <div>
              <span>© 2025 Chainlab</span>
              <Link href="#path">Course outline</Link>
              <CourseMaterials appearance="link" />
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
