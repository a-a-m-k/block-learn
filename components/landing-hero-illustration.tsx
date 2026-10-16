import styles from "@/app/landing.module.css";

import { cn } from "@/lib/utils";

const blocks = [104, 105, 106, 107] as const;

export function LandingHeroIllustration() {
  return (
    <div className={styles.courseVisual} aria-label="Connected blockchain blocks">
      <div className={styles.visualGrid} />
      <div className={styles.visualChain}>
        {blocks.map((block, index) => (
          <div
            className={cn(styles.visualBlock, styles[`block${index}`])}
            key={block}
          >
            <i />
            <small>BLOCK</small>
            <strong>#{block}</strong>
          </div>
        ))}
        <span className={cn(styles.connector, styles.connectorA)} />
        <span className={cn(styles.connector, styles.connectorB)} />
        <span className={cn(styles.connector, styles.connectorC)} />
      </div>
      <div className={cn(styles.floatingData, styles.dataA)}>
        <small>TRANSACTIONS</small>
        <span>ALEX → SAM</span>
        <strong>0.4 ETH</strong>
      </div>
      <div className={cn(styles.floatingData, styles.dataB)}>
        <small>LATEST HASH</small>
        <span>0000...8F2A</span>
        <i>VERIFIED</i>
      </div>
    </div>
  );
}
