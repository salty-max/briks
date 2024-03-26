/* eslint-disable no-console */
import { Meta, StoryFn } from '@storybook/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from '@briks/ui';

const meta = {
  title: 'Molecules/Form',
  parameters: {
    componentSubtitle: 'Form builder with React Hook Form',
    layout: 'centered',
  },
  args: {},
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryFn<typeof meta>;

const PokemonFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
});

export const Basic: Story = () => {
  const form = useForm<z.infer<typeof PokemonFormSchema>>({
    resolver: zodResolver(PokemonFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: z.infer<typeof PokemonFormSchema>) => {
    toast({
      title: 'Submitted',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 dark:bg-slate-300 p-4'>
          <code className='text-white dark:text-slate-950'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Pikachu' {...field} />
              </FormControl>
              <FormDescription>The name of your pokemon</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
