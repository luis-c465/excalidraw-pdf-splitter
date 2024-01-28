import {
  ImageSplitOption,
  imageSplitOptions,
  imageSplitOptionsAtom,
} from "@/lib/atoms";
import { toTitleCase } from "@/lib/string";
import {
  IconCircleHalf,
  IconCircleHalfVertical,
  IconFileDots,
  IconSelectAll,
  TablerIconsProps,
} from "@tabler/icons-react";
import { useAtom } from "jotai";

type IconComponent = React.FC<TablerIconsProps>;
const IconMapping: Record<ImageSplitOption, IconComponent> = {
  horizontally: IconCircleHalfVertical,
  vertically: IconCircleHalf,
  selection: IconSelectAll,
  "entire sketch": IconFileDots,
};

export default function SplitterOptions() {
  const [imageSplit, setImageSplit] = useAtom(imageSplitOptionsAtom);

  return (
    <div className="flex gap-2">
      {imageSplitOptions.map((key) => (
        <SplitOption
          value={key}
          Icon={IconMapping[key]}
          handleChange={(value) => setImageSplit(value as ImageSplitOption)}
          selected={key === imageSplit}
          key={key}
        />
      ))}
    </div>
  );
}

type SplitOptionProps = {
  Icon: IconComponent;
  value: string;
  handleChange: (value: string) => void;
  selected: boolean;
};
function SplitOption({
  Icon,
  value,
  selected,
  handleChange,
}: SplitOptionProps) {
  return (
    <label className="flex gap-2">
      <input
        type="radio"
        value={value}
        name="split_option"
        checked={selected}
        onChange={() => handleChange(value)}
      />
      <span className="flex">
        <Icon />
        {toTitleCase(value)}
      </span>
    </label>
  );
}
