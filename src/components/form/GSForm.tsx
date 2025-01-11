"use client";

import { ReactNode, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface formConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends formConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

const GSForm = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
  const formConfig: formConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm({
    ...formConfig,
    // This ensures the form keeps the latest default values
    values: defaultValues
  });

  const { reset, setValue } = methods;

  useEffect(() => {
    if (defaultValues) {
      // Set each field individually to ensure persistence
      Object.entries(defaultValues).forEach(([field, value]) => {
        setValue(field, value);
      });
      // Also do a full reset to ensure form state is updated
      reset(defaultValues);
    }
  }, [defaultValues, reset, setValue]);

  const handleSubmit = methods.handleSubmit;
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default GSForm;