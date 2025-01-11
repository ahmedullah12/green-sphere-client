"use client";

import { IInput } from "@/src/types";
import { Input } from "@nextui-org/input";
import { useFormContext, Controller } from "react-hook-form";

interface IProps extends IInput {}

export default function GSInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  disabled,
}: IProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          value={field.value || ''}  // Ensure value is never undefined
          variant={variant}
          size={size}
          required={required}
          type={type}
          label={label}
          isDisabled={disabled}
          errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
          isInvalid={!!errors[name]}
        />
      )}
    />
  );
}