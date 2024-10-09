"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import GSForm from "../form/GSForm";
import GSInput from "../form/GSInput";
import GSModal from "./GSModal";
import { Button } from "@nextui-org/button";
import { useUser } from "@/src/context/user.provider";
import { useCreatePayment } from "@/src/hooks/payment.hooks";
import { IPaymentPayload } from "@/src/types";
import { useState } from "react";

const CreatePaymentModal = ({ disable }: { disable: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const { mutate: handleCreatePayment } = useCreatePayment();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const paymentData = {
      ...data,
      userId: user?._id as string,
    };

    handleCreatePayment(paymentData as IPaymentPayload, {
      onSuccess: (data) => {
        window.location.href = data.data.payment_url;
      },
    });
  };
  return (
    <>
      <Button
        isDisabled={disable}
        size="sm"
        className="bg-blue-400 dark:bg-default text-white disabled:bg-gray-200 disabled:dark:bg-gray-200"
        onPress={() => setIsOpen(true)}
      >
        Verify
      </Button>
      <GSModal
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        title="Payment"
      >
        <h3 className="text-xl my-1 ">Pay 500tk to verify your account</h3>
        <GSForm
          defaultValues={{ name: user?.name, email: user?.email }}
          onSubmit={handleSubmit}
        >
          <div className="py-3">
            <GSInput label="name" name="name" size="sm" required={true} />
          </div>
          <div className="py-3">
            <GSInput label="email" name="email" size="sm" disabled={true} />
          </div>
          <div className="py-3">
            <GSInput label="phone" name="phone" size="sm" required={true} />
          </div>
          <div className="py-3">
            <GSInput label="address" name="address" size="sm" required={true} />
          </div>

          <Button
            className="my-3 w-full bg-primary dark:bg-default text-white rounded-md"
            size="lg"
            type="submit"
            // isDisabled={isPending}
          >
            Start Payment
          </Button>
        </GSForm>
      </GSModal>
    </>
  );
};

export default CreatePaymentModal;
