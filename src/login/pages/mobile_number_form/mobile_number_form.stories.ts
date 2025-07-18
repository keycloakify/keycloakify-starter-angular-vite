import { Meta, StoryObj } from '@storybook/angular';
import { decorators, KcPageStory } from '../../KcPageStory';

const meta: Meta<KcPageStory> = {
  title: 'login/mobile_number_form.ftl',
  component: KcPageStory,
  decorators: decorators,
  globals: {
    pageId: 'mobile_number_form.ftl',
  },
};

export default meta;
type Story = StoryObj<KcPageStory>;

export const Default: Story = {};
