"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import {
  Leaf,
  Users,
  BookOpen,
  Sprout,
  Heart,
  MessageCircle,
} from "lucide-react";
import { FaSeedling } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import Container from "@/src/components/UI/Container";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
};

const teamMembers = [
  {
    name: "Emily Green",
    role: "Founder & Head Horticulturist",
    bio: "With over 15 years of experience, Emily's passion for sustainable gardening practices has been the driving force behind GreenSphere.",
    image:
      "https://res.cloudinary.com/drg8g1xpx/image/upload/v1727980668/fotos-r77Buio2tds-unsplash_rae5d4.jpg",
  },
  {
    name: "Michael Bloom",
    role: "Community Manager",
    bio: "Michael's expertise in building online communities has helped shape GreenSphere into the thriving platform it is today.",
    image:
      "https://res.cloudinary.com/drg8g1xpx/image/upload/v1727980677/samuel-raita-RiDxDgHg7pw-unsplash_ryg4fg.jpg",
  },
  {
    name: "Sarah Roots",
    role: "Content Curator",
    bio: "Sarah's keen eye for quality content ensures that GreenSphere always offers the most relevant and insightful gardening advice.",
    image:
      "https://res.cloudinary.com/drg8g1xpx/image/upload/v1727980669/clay-elliot-HfMCgqOLTyM-unsplash_mhx38h.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 bg-green-50 dark:bg-black">
      <Container>
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-primary dark:text-white"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          About GreenSphere
        </motion.h1>

        <motion.section
          className="mb-16 text-center"
          initial="hidden"
          animate="visible"
          variants={slideIn}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-primary dark:text-white">
            Our Mission
          </h2>
          <p className="text-lg mb-4">
            At GreenSphere, we&apos;re passionate about cultivating a thriving
            community of gardening enthusiasts and professionals. Our mission is
            to provide a comprehensive platform where green thumbs of all levels
            can share knowledge, discover new techniques, and grow together in
            their gardening journey.
          </p>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={slideIn}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-primary dark:text-white">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Tips",
                icon: <Leaf className="w-8 h-8 text-primary dark:text-white" />,
              },
              {
                title: "Community",
                icon: <Users className="w-8 h-8 text-primary dark:text-white" />,
              },
              {
                title: "Premium Content",
                icon: <BookOpen className="w-8 h-8 text-primary dark:text-white" />,
              },
              {
                title: "Seasonal Guides",
                icon: <Sprout className="w-8 h-8 text-primary dark:text-white" />,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="p-4 bg-white dark:bg-default shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                  {item.icon}
                  <h4 className="font-bold text-large mt-2">{item.title}</h4>
                </CardHeader>
                <CardBody className="text-center">
                  <p className="text-sm">
                    Discover the best in gardening with our{" "}
                    {item.title.toLowerCase()}.
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-2xl md:text-3xl text-center font-semibold mb-6 text-primary dark:text-white">
            Our Community
          </h2>
          <p className="text-lg mb-6">
            GreenSphere is more than just a platform; it&apos;s a vibrant
            community of gardeners from all walks of life. Whether you&apos;re a
            seasoned horticulturist or just starting out, you&apos;ll find a
            welcoming space to share your experiences, ask questions, and
            connect with fellow plant enthusiasts.
          </p>
          <Button
            size="lg"
            className="bg-primary dark:bg-default text-white font-semibold"
          >
            Join Our Community
          </Button>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={slideIn}
        >
          <h2 className="text-2xl md:text-3xl text-center font-semibold text-primary  dark:text-white mb-6">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-default shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardBody>
                  <Image
                    alt={member.name}
                    className="object-cover rounded-xl"
                    src={member.image}
                    width="100%"
                    height={300}
                  />
                  <h3 className="text-xl font-semibold mt-4 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-primary dark:text-white mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="pb-8"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-primary text-center dark:text-white">
            Join Our Green Journey
          </h2>
          <p className="text-base md:text-lg text-center  mb-6">
            Become a part of the GreenSphere community and embark on a rewarding
            gardening adventure. Here&apos;s how you can get involved:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-default shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardBody className="text-center">
                <FaSeedling className="w-12 h-12 text-primary dark:text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Start Your Journey
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Create your free account and start exploring our wealth of
                  gardening resources.
                </p>
                <Button className="bg-primary dark:bg-gray-600 text-white">Sign Up</Button>
              </CardBody>
            </Card>
            <Card className="bg-white dark:bg-default shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardBody className="text-center">
                <Heart className="w-12 h-12 text-primary dark:text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Share Your Passion
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Contribute your own gardening tips and experiences to help
                  others grow.
                </p>
                <Button className="bg-primary dark:bg-gray-600 text-white">Start Sharing</Button>
              </CardBody>
            </Card>
            <Card className="bg-white dark:bg-default shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardBody className="text-center">
                <MessageCircle className="w-12 h-12 text-primary dark:text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Connect & Learn</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Engage with fellow gardeners, ask questions, and expand your
                  knowledge.
                </p>
                <Button className="bg-primary dark:bg-gray-600 text-white">Join Discussions</Button>
              </CardBody>
            </Card>
          </div>
        </motion.section>
      </Container>
    </div>
  );
}
