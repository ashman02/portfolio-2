"use client";
import React, { useRef, useState } from "react";
import Input from "../Input";
import Button from "../Button";

const Contact = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const challengeInputRef = useRef<HTMLInputElement>(null);
  const goalInputRef = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState("");
  const handleFormSubmit = () => {
    if (
      !emailInputRef.current?.value ||
      !challengeInputRef.current?.value ||
      !goalInputRef.current?.value
    ) {
      setResponse("Please fill out all fields");
      return;
    }
    console.log(
      emailInputRef.current.value,
      challengeInputRef.current.value,
      goalInputRef.current.value,
    );
  };
  return (
    <div
      className="my-grid bg-background flex flex-col gap-10 rounded-b-lg md:gap-12 lg:gap-16"
    >
      <div className="contact-header flex w-full flex-col gap-3 md:w-5/6 md:gap-4 lg:w-3/5 lg:gap-6">
        <h1 className="section-heading hidden">
          Your Dream Website is One Form Away
        </h1>
        <p className="para-text text-gray-600">
          let&apos;s get your project started today because I only take on 1-2
          projects per month.
        </p>
      </div>
      <div className="input-form flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <div className="w-full">
            <Input
              label="Email"
              placeholder="Your best email address"
              type="email"
              ref={emailInputRef}
            />
          </div>
          <div className="w-full">
            <Input
              label="Tell me about your project?"
              placeholder="What's your vision? Current challenges?"
              ref={challengeInputRef}
            />
          </div>
        </div>
        <div>
          <Input
            label="What would success look like?"
            placeholder="Dream outcomes?"
            ref={goalInputRef}
          />
        </div>
        <div>
          <Button
            name="Let’s Build Something Amazing"
            onClick={handleFormSubmit}
          />
        </div>
        <p className="para-text">{response}</p>
      </div>
    </div>
  );
};

export default Contact;
