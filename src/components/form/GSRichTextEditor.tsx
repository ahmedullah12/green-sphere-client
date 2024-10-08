"use client";

import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface IProps {
  name: string;
  label: string;
  required?: boolean;
}

export default function GSRichTextEditor({ name, label, required }: IProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? "This field is required" : false,
        }}
        render={({ field }) => (
          <ReactQuill
            value={field.value || ""}
            onChange={field.onChange}
            className={`my-2 ${errors[name] ? "border-red-500" : ""}`}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message as string}</p>
      )}
    </div>
  );
}
