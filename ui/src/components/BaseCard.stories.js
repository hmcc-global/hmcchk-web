import BaseCard from './BaseCard';

const meta = {
  title: 'Components/BaseCard',
  component: BaseCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'The title to display in the card',
    },
  },
};
export default meta;

const Template = (args) => <BaseCard {...args}>Sample card content</BaseCard>;

export const Default = Template.bind({});
Default.args = {
  title: 'Default Card Title',
};

export const WithCustomTitle = Template.bind({});
WithCustomTitle.args = {
  title: 'Custom Card Title',
};

export const EmptyTitle = Template.bind({});
EmptyTitle.args = {
  title: '',
};
