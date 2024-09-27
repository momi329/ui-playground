import type { Meta, StoryObj } from "@storybook/react";

import { CheckIcon } from "../icons";
import { Select } from "./select";

const meta: Meta<typeof Select.Root> = {
  title: "components/Select",
  component: Select.Root,
  args: {
    color: "white", // 添加默认颜色
  },
  argTypes: {
    color: {
      control: "select",
      options: ["white", "red"],
      description: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select.Root>;

export const defaultSelect: Story = {
  render: function Component(args) {
    return (
      <>
        <form action="">
          <Select.Root {...args}>
            <Select.Trigger data-state="open" color={args.color}>
              <Select.Value placeholder="不限價格" />
              <CheckIcon color={args.color === "red" ? "white" : "#222"} />
            </Select.Trigger>
            <Select.Content sideOffset={5}>
              <Select.Group className="m-2">
                <Select.Item value="none">不限</Select.Item>
                <Select.Item value="est">從低至高</Select.Item>
                <Select.Item value="cst">從高至低</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </form>
        {/* 使 scrollbar 出現 */}
        <div className="h-[400vh]" />
      </>
    );
  },
};

export const filterSelect: Story = {
  render: function Component(args) {
    return (
      <form action="">
        <Select.Root {...args}>
          <Select.Trigger data-state="open" hasBorder={false} color="red">
            <Select.Value placeholder="不限價格" />
            <CheckIcon color="white" />
          </Select.Trigger>
          <Select.Content sideOffset={5}>
            <Select.Group>
              <Select.Label>不限價格</Select.Label>
              <Select.Item
                value="est"
                className="justify-center hover:bg-red-500 hover:text-white-500 rounded-[0]"
              >
                從低至高
              </Select.Item>
              <Select.Item
                value="cst"
                className="justify-center hover:bg-red-500 hover:text-white-500  rounded-[0]"
              >
                從高至低
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </form>
    );
  },
};

export const searchDropdownDefault: Story = {
  render: function Component(args) {
    return (
      <form action="">
        <Select.Root {...args}>
          <Select.Trigger
            className="h-10 w-35 block text-left px-1 pt-2"
            data-state="open"
          >
            <div className="text-sm leading-[14px]">旅遊天數</div>
            <Select.Value placeholder="不限" />
          </Select.Trigger>
          <Select.Content
            className="w-35 items-center border-stone-400"
            sideOffset={5}
          >
            <Select.Group className="m-2">
              <Select.Item value="none">不限</Select.Item>
              <Select.Item value="2">2天</Select.Item>
              <Select.Item value="3">3天</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </form>
    );
  },
};
