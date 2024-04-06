import { cn } from '@briks/core';
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
  Slider,
  toast,
} from '@briks/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

const meta = {
  title: 'Form/Slider',
  component: Slider,
  parameters: {
    componentSubtitle: 'An input where the user selects a value from within a given range.',
    layout: 'padded',
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <Slider defaultValue={[50]} max={100} step={1} className={cn('w-[60%]', args.className)} />
  ),
};

const STATS = [
  { key: 'hp', label: 'HP' },
  { key: 'atk', label: 'Attack' },
  { key: 'def', label: 'Defense' },
  { key: 'speAtk', label: 'Sp. Attack' },
  { key: 'speDef', label: 'Sp. Defense' },
  { key: 'spd', label: 'Speed' },
] as const;

const PokemonStatsFormSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  hp: z.number({ required_error: 'HP is required.' }),
  atk: z.number({ required_error: 'Attack is required.' }),
  def: z.number({ required_error: 'Defense is required.' }),
  speAtk: z.number({ required_error: 'Special Attack is required.' }),
  speDef: z.number({ required_error: 'Special Defense is required.' }),
  spd: z.number({ required_error: 'Speed is required.' }),
});

export const WithForm: Story = {
  render: () => {
    const form = useForm<z.infer<typeof PokemonStatsFormSchema>>({
      resolver: zodResolver(PokemonStatsFormSchema),
      defaultValues: {
        name: 'Bulbasaur',
        hp: 45,
        atk: 49,
        def: 49,
        speAtk: 65,
        speDef: 65,
        spd: 45,
      },
    });

    const { control, handleSubmit } = form;

    const onSubmit = (data: z.infer<typeof PokemonStatsFormSchema>) => {
      toast({
        title: 'Submitted',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4 dark:bg-slate-300'>
            <code className='text-white dark:text-slate-950'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    };

    return (
      <>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='w-1/2 space-y-6'>
            <FormField
              control={control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Pokemon name...' {...field} />
                  </FormControl>
                  <FormDescription>The name of your pokemon</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {STATS.map(stat => (
              <FormField
                key={stat.key}
                control={control}
                name={stat.key}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{stat.label}</FormLabel>
                    <FormControl>
                      <Slider
                        onValueChange={vals => field.onChange(vals[0])}
                        value={[field.value]}
                        max={252}
                        step={1}
                      />
                    </FormControl>
                    <FormDescription>{field.value}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </>
    );
  },
};
