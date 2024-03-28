/* eslint-disable no-console */
import { Meta, StoryFn } from '@storybook/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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

const TypeEnum = z.enum(
  [
    'normal',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'dark',
    'fairy',
    'poison',
    'fighting',
    'flying',
    'ice',
    'bug',
    'steel',
    'dragon',
    'ground',
    'rock',
  ],
  { required_error: 'Type is required' },
);

const PokemonFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  type: TypeEnum,
  seen: z.boolean(),
  captured: z.boolean(),
});

export const Basic: Story = () => {
  const form = useForm<z.infer<typeof PokemonFormSchema>>({
    resolver: zodResolver(PokemonFormSchema),
    defaultValues: {
      name: '',
      type: undefined,
      seen: false,
      captured: false,
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
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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
        <FormField
          control={control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a type' />
                  </SelectTrigger>
                  <SelectContent>
                    {TypeEnum.options.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>The type of your pokemon</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='seen'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center space-x-2'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Have you seen this pokemon?</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='captured'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center space-x-2'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Have you captured this pokemon?</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
