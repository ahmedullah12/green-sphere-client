import { IInput } from "@/src/types";
import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {
  options: { key: string; label: string }[];
  selectionMode: "single" | "none" | "multiple";
  value?: string[];
}

const GSSelect = ({
  options,
  name,
  label,
  variant = "bordered",
  disabled,
  required=false,
  selectionMode,
  size= "sm",
  value=[]
}: IProps) => {
  const { register } = useFormContext();
  return (
    <Select
      label={label}
      variant={variant}
      {...register(name)}
      isDisabled={disabled}
      selectionMode={selectionMode}
      size={size}
      isRequired={required}
      defaultSelectedKeys={value}
    >
      {options?.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default GSSelect;
