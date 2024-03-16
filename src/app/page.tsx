/* eslint-disable no-console */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required!',
  }),
  price: z.number().positive(),
  description: z.string().min(1, {
    message: 'Description is required!',
  }),
  categoryId: z.number().positive(),
  images: z.array(z.string()),
});

const Page = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      categoryId: 1,
      images: ['https://placeimg.com/640/480/any?r=0.9178516507833767'],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values, 'data');
    const response = await axios.post(
      'https://api.escuelajs.co/api/v1/products/',
      values
    );

    if (response.status === 200 || response.status === 201) {
      toast({
        title: 'Success',
        message: 'Product created successfully.',
        type: 'success',
      });
      form.reset();
    } else {
      toast({
        title: 'Error',
        message: 'An error occurred while creating the product.',
        type: 'error',
      });
    }
    console.log(response, 'response');
  };

  return (
    <div className="mx-auto max-w-screen-md px-8 py-2">
      <h1 className="mb-5 text-center text-xl font-bold">React Hook Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="title"
                    {...field}
                    className={cn({
                      'border-red-500 ring-2  ring-offset-2 focus:ring-2 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2':
                        form.formState.errors.title,
                    })}
                  />
                </FormControl>
                <FormDescription>This is your title name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="price"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    className={cn({
                      'border-red-500 ring-2  ring-offset-2 focus:ring-2 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2':
                        form.formState.errors.price,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="description"
                    {...field}
                    className={cn({
                      'border-red-500 ring-2  ring-offset-2 focus:ring-2 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2':
                        form.formState.errors.description,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(parseInt(value, 10));
                    }}
                    defaultValue={form.watch('categoryId')?.toString()}
                  >
                    <SelectTrigger
                      className={cn({
                        'border-red-500 ring-2  ring-offset-2 focus:ring-2 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2':
                          form.formState.errors.categoryId,
                      })}
                    >
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Category 1</SelectItem>
                      <SelectItem value="2">Category 2</SelectItem>
                      <SelectItem value="3">Category 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <div className="flex space-x-2">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-gray-900" />
                Loading...
              </div>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
