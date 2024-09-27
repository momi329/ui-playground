import type { Meta, StoryObj } from "@storybook/react";
import { ElementRef, useRef } from "react";

import { PlusIcon, ChevronDownIcon } from "../icons/index";
import { Button } from "./button";
import { RingLoader } from "../spin/index";

const meta: Meta<typeof Button> = {
  title: "components/Button",
  component: Button,
  args: {
    color: "red",
    size: "sm",
    radius: "default",
  },
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["red", "slate", "stone", "black", "blue", "orange"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    radius: {
      control: { type: "select" },
      options: ["default", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Fill: Story = {
  args: {
    variant: "fill",
    children: "立即報名",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "立即報名",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "立即報名",
  },
};

export const Loading: Story = {
  render: function Component(args) {
    const buttonRef = useRef<ElementRef<"button"> | null>(null);

    return (
      <Button
        ref={buttonRef}
        onClick={() => {}}
        className="gap-1 bg-slate-500/[0.2]"
        disabled
        {...args}
      >
        立即報名
        <RingLoader color="white" size="sm" />
      </Button>
    );
  },
};

export const WithIcon: Story = {
  render: function Component(args) {
    return (
      <Button className="gap-1" {...args}>
        <PlusIcon />
        立即報名
        <ChevronDownIcon />
      </Button>
    );
  },
};

export const Anchor: Story = {
  render: function Component(args) {
    return (
      <Button {...args} asChild>
        <a href="https://www.google.com/" target="_blank" rel="noreferrer">
          立即報名
        </a>
      </Button>
    );
  },
};
