"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import GSForm from "@/src/components/form/GSForm";
import GSInput from "@/src/components/form/GSInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Container from "@/src/components/UI/Container";
import GSTextarea from "@/src/components/form/GSTextarea";
import { Divider } from "@nextui-org/divider";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const slideIn = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
};

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, click on the 'Forgot Password' link on the login page. Follow the instructions sent to your registered email address.",
  },
  {
    question: "Can I upgrade to a premium account?",
    answer:
      "Yes! You can upgrade to a premium account from your user dashboard. Premium accounts get access to exclusive content and features.",
  },
  {
    question: "How can I contribute content to GreenSphere?",
    answer:
      "We welcome contributions from our community! Once logged in, you can navigate to the 'Create Post' section to share your gardening tips and experiences.",
  },
];

export default function ContactPage() {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className=" mx-auto px-4 pb-8 bg-green-50 dark:bg-black">
      <Container>
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-primary dark:text-white"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          Contact Us
        </motion.h1>
        <Divider className="my-10" />
        <motion.div
          className="w-full "
          initial="hidden"
          animate="visible"
          variants={slideIn}
        >
          <h2 className="text-2xl md:text-3xl text-center font-semibold mb-6 text-primary dark:text-white">
            Get in Touch
          </h2>
          <div className="w-full md:w-[50%] lg:w-[40%] mx-auto">
            <GSForm onSubmit={handleSubmit}>
              <div className="py-3">
                <GSInput
                  type="text"
                  name="email"
                  label="Name"
                  size="sm"
                  required={true}
                />
              </div>
              <div className="py-3">
                <GSInput
                  label="Email"
                  type="text"
                  name="email"
                  size="sm"
                  required={true}
                />
              </div>
              <div className="py-3">
                <GSTextarea label="Message" name="message" required={true} />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary dark:bg-gray-600 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </GSForm>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10 md:mt-20"
          initial="hidden"
          animate="visible"
          variants={slideIn}
        >
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-primary dark:text-white">
              Contact Information
            </h2>
            <Card className="mb-6">
              <CardBody>
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 text-primary dark:text-white mr-4" />
                  <p>support@greensphere.com</p>
                </div>
                <div className="flex items-center mb-4">
                  <Phone className="w-6 h-6 text-primary dark:text-white mr-4" />
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-primary dark:text-white mr-4" />
                  <p>123 Green Street, Plantville, EV 98765</p>
                </div>
              </CardBody>
            </Card>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6 text-primary dark:text-white">
              FAQ
            </h2>
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  aria-label={faq.question}
                  title={faq.question}
                >
                  {faq.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
