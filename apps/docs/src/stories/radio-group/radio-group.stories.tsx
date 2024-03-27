import { Meta, StoryFn } from '@storybook/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Button,
  RadioGroup,
  RadioGroupItem,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Label,
  toast,
  FormMessage,
} from '@briks/ui';

const meta = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    componentSubtitle:
      'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.',
    layout: 'centered',
  },
  args: {},
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryFn<typeof meta>;

export const Basic: Story = () => (
  <RadioGroup defaultValue='comfortable' className='grid space-y-0.5'>
    <div className='flex items-center space-x-2'>
      <RadioGroupItem value='default' id='r1' />
      <Label htmlFor='r1'>Default</Label>
    </div>
    <div className='flex items-center space-x-2'>
      <RadioGroupItem value='comfortable' id='r2' />
      <Label htmlFor='r2'>Comfortable</Label>
    </div>
    <div className='flex items-center space-x-2'>
      <RadioGroupItem value='compact' id='r3' />
      <Label htmlFor='r3'>Compact</Label>
    </div>
  </RadioGroup>
);

const FormSchema = z.object({
  type: z.enum(['all', 'mentions', 'none'], {
    required_error: 'You need to select a notification type.',
  }),
});

export const WithForm: Story = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='all' />
                    </FormControl>
                    <FormLabel className='font-normal'>All new messages</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='mentions' />
                    </FormControl>
                    <FormLabel className='font-normal'>Direct messages and mentions</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='none' />
                    </FormControl>
                    <FormLabel className='font-normal'>Nothing</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
