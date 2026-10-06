"use client";

import { useState } from "react";

import { PANEL, type ExploreTransactionContent } from "./constants";
import { FieldDetailPanel } from "./field-detail-panel";
import { FieldList } from "./field-list";
import { WhyItMattersPanel } from "./why-it-matters";

type ExploreTransactionBlockProps = {
  block: ExploreTransactionContent;
};

export function ExploreTransactionBlock({
  block,
}: ExploreTransactionBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const field = block.fields[activeIndex] ?? block.fields[0];
  const lastIndex = block.fields.length - 1;

  function goPrev() {
    setActiveIndex((index) => Math.max(0, index - 1));
  }

  function goNext() {
    setActiveIndex((index) => Math.min(lastIndex, index + 1));
  }

  return (
    <figure aria-label="Explore the fields inside a transaction">
      <div data-part="layout" className="explore-layout">
        <FieldList
          fields={block.fields}
          activeIndex={activeIndex}
          onSelectField={setActiveIndex}
        />

        <FieldDetailPanel
          field={field}
          activeIndex={activeIndex}
          fieldCount={block.fields.length}
          onPrev={goPrev}
          onNext={goNext}
          className={PANEL}
        />

        <WhyItMattersPanel
          key={field.id}
          title={block.whyItMatters.title}
          text={field.whyItMatters}
        />
      </div>
    </figure>
  );
}
