/* eslint-disable no-console */
import { Meta, StoryFn } from '@storybook/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Button,
  Checkbox,
  DatePicker,
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
import { Combobox } from '@briks/ui';

const meta = {
  title: 'Form/Form',
  parameters: {
    componentSubtitle: 'Form builder with React Hook Form',
    layout: 'centered',
  },
  args: {},
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

const locations: Record<string, string> = {
  starter: 'Starter',
  gift: 'Gift',
  reward: 'Reward',
  route1: 'Route 1',
  route2: 'Route 2',
  route3: 'Route 3',
  route4: 'Route 4',
  route5: 'Route 5',
  route6: 'Route 6',
  route7: 'Route 7',
  route8: 'Route 8',
  route9: 'Route 9',
  route10: 'Route 10',
  route11: 'Route 11',
  route12: 'Route 12',
  route13: 'Route 13',
  route14: 'Route 14',
  route15: 'Route 15',
  route16: 'Route 16',
  route17: 'Route 17',
  route18: 'Route 18',
  route19: 'Route 19',
  route20: 'Route 20',
  route21: 'Route 21',
  route22: 'Route 22',
  route23: 'Route 23',
  route24: 'Route 24',
  route25: 'Route 25',
  viridianForest: 'Viridian Forest',
  mountMoon: 'Mount Moon',
  diglettsTunnel: "Diglett's Tunnel",
  rockTunnel: 'Rock Tunnel',
  pokemonTower: 'Pokemon Tower',
  safariZone: 'Safari Zone',
  powerPlant: 'Power Plant',
  seaFoamIsland: 'Seafoam Island',
  pokemonMansion: 'Pokemon Mansion',
  treasureBeach: 'Treasure Beach',
  kindleRoad: 'Kindle Road',
  mountEmber: 'Mount Ember',
  capeBrink: 'Cape Brink',
  threeIslePort: 'Three Isle Port',
  bondBridge: 'Bond Bridge',
  berryForest: 'Berry Forest',
  victorRoad: 'Victor Road',
};

const PokemonFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  type: TypeEnum,
  captureLocation: z.coerce.string({ required_error: 'Capture location is required' }),
  capturedAt: z.date().optional(),
  seen: z.boolean(),
  captured: z.boolean(),
});

export const Default: Story = () => {
  const form = useForm<z.infer<typeof PokemonFormSchema>>({
    resolver: zodResolver(PokemonFormSchema),
    defaultValues: {
      name: '',
      type: undefined,
      captureLocation: undefined,
      capturedAt: undefined,
      seen: false,
      captured: false,
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: z.infer<typeof PokemonFormSchema>) => {
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
          name='captureLocation'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capture location</FormLabel>
              <FormControl>
                <Combobox
                  items={Object.entries(locations).map(([value, label]) => ({ value, label }))}
                  value={field.value}
                  onSelect={field.onChange}
                  placeholder='Select a location'
                />
              </FormControl>
              <FormDescription>Where this pokemon was captured</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='capturedAt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of capture</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Pick a capture date'
                />
              </FormControl>
              <FormDescription>Where this pokemon was captured</FormDescription>
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
