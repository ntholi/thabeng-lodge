'use client';

import {
  CreateView,
  CreateViewProps,
  DetailsView,
  EditView,
  EditViewProps,
  FieldView,
  ImagePicker,
  ReferenceField,
  ReferenceView,
  ResourcePage,
  TextField,
} from '@/app/(admin)/admin-core';
import { shorten, stripHtml } from '@/lib/utils';
import { Box, Divider, Image } from '@mantine/core';
import { IconCheck, IconExclamationMark } from '@tabler/icons-react';
import NextImage from 'next/image';
import RichTextField from '../../admin-core/form/RichTextField';
import TextAreaField from '../../admin-core/form/TextAreaField';
import { Post } from './Post';
import PublishSwitch from './PublishSwitch';
import { revalidate } from './actions';
import { postRepository } from './repository';
import { IconExclamationCircle } from '@tabler/icons-react';

export default function PostPage() {
  return (
    <ResourcePage
      resourceLabel='Posts'
      repository={postRepository}
      create={PostCreate}
      edit={PostEdit}
      details={PostDetails}
      navLinkProps={(it) => ({
        label: shorten(it.title, 36),
        description: `By ${it.author?.name || 'Anonymous'}`,
        rightSection: it.published ? (
          <IconCheck size={'1.2rem'} color='green' />
        ) : (
          <IconExclamationCircle size={'1rem'} color='gray' />
        ),
      })}
    ></ResourcePage>
  );
}

function PostDetails({ item }: { item: Post }) {
  return (
    <DetailsView>
      <Box>
        <PublishSwitch article={item} />
        <Divider mt={'md'} />
      </Box>
      <FieldView label='Title' value={item.title} />
      <FieldView label={shorten(item.caption)} value={'Caption'} />
      <FieldView label={stripHtml(item.body, 100)} value='Body' />
      <ReferenceView
        reference='categories'
        referenceKey={item?.category?.id}
        label='Category'
        value={item?.category?.name}
      />
      <ReferenceView
        reference='authors'
        referenceKey={item?.author?.id}
        label='Author'
        value={item?.author?.name}
      />
      <div>
        {item.image && (
          <Image
            src={item.image}
            alt={item.title}
            component={NextImage}
            height={400}
            width={400}
            radius='md'
            h={200}
            w='auto'
            fit='contain'
          />
        )}
      </div>
    </DetailsView>
  );
}

function PostCreate(props: CreateViewProps<Post>) {
  return (
    <CreateView
      {...props}
      afterSubmit={async () => {
        await revalidate('/');
      }}
    >
      <TextField name='title' />
      <TextAreaField name='caption' />
      <ReferenceField
        referenceLabel='name'
        reference='categories'
        name='category'
      />
      <ReferenceField referenceLabel='name' reference='authors' name='author' />
      <ImagePicker name='image' folder='posts' />
      <RichTextField name='body' />
    </CreateView>
  );
}

function PostEdit(props: EditViewProps<Post>) {
  return (
    <EditView
      {...props}
      afterSubmit={async () => {
        await revalidate('/');
      }}
    >
      <TextField name='title' />
      <TextAreaField name='caption' />
      <ReferenceField
        referenceLabel='name'
        reference='categories'
        name='category'
      />
      <ReferenceField referenceLabel='name' reference='authors' name='author' />
      <ImagePicker name='image' folder='posts' />
      <RichTextField name='body' />
    </EditView>
  );
}
