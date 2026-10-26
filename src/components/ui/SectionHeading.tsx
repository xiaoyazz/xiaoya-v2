interface SectionHeadingProps {
  children: string;
}

const SectionHeading = ({ children }: SectionHeadingProps) => (
  <div className="section-heading-wrap">
    <h2 className="section-heading">/ {children}</h2>
    <span className="section-heading-line" aria-hidden="true" />
  </div>
);

export default SectionHeading;
