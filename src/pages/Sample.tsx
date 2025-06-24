// Temporary import approach - we'll get the actual content next
import Overview from "./Overview";

// For now, create Sample as a wrapper that uses Overview content
// but with updated title
const Sample: React.FC = () => {
  return <Overview />;
};

export default Sample;
