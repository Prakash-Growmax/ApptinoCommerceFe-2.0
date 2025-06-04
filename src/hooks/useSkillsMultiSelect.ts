import { useState } from "react";

const skillsList = [
  "JavaScript",
  "React",
  "Node.js",
  "CSS",
  "MongoDB",
  "TypeScript",
  "Express",
];

export function useSkillsMultiSelect() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  return {
    skillsList,
    selectedSkills,
    toggleSkill,
  };
}
