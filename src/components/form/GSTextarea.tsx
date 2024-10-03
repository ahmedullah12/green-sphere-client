import { IInput } from "@/src/types";
import { Textarea } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";

interface IProps extends IInput {
  type?: string;
}

const GSTextarea = ({ name, label, variant = "bordered", required=false, }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ name });
  return (
    <Textarea
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      variant={variant}
      minRows={6}
      value={currentValue || ""}
      required={required}
    />
  );
};

export default GSTextarea;
