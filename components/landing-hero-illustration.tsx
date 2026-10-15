import styles from "@/app/landing.module.css";

const blocks = [104, 105, 106, 107] as const;

export function LandingHeroIllustration() {
  return (
    <div className={styles.courseVisual} aria-label="Connected blockchain blocks">
      <div className={styles.visualGrid} />
      <div className={styles.visualChain}>
        {blocks.map((block, index) => (
          <div
            className={`${styles.visualBlock} ${styles[`block${index}`]}`}
            key={block}
          >
            <i />
            <small>BLOCK</small>
            <strong>#{block}</strong>
          </div>
        ))}
        <span className={`${styles.connector} ${styles.connectorA}`} />
        <span className={`${styles.connector} ${styles.connectorB}`} />
        <span className={`${styles.connector} ${styles.connectorC}`} />
      </div>
      <div className={`${styles.floatingData} ${styles.dataA}`}>
        <small>TRANSACTIONS</small>
        <span>ALEX → SAM</span>
        <strong>0.4 ETH</strong>
      </div>
      <div className={`${styles.floatingData} ${styles.dataB}`}>
        <small>LATEST HASH</small>
        <span>0000...8F2A</span>
        <i>VERIFIED</i>
      </div>
    </div>
  );
}
