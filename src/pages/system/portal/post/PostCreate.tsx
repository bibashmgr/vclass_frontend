import { useState } from 'react';

// layouts
import FormLayout from '../../../../layouts/crud_layouts/FormLayout';
import InputField from '../../../../components/global/form/InputField';
import SelectField from '../../../../components/global/form/SelectField';

// schemas
import { postSchema } from '../../../../utils/schemas';

const PostCreate = () => {
  const [post, setPost] = useState<postSchema>();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleCreatePost = () => {};

  const categories = [
    {
      title: 'Material',
      value: 'material',
    },
    {
      title: 'Assignment',
      value: 'assignment',
    },
  ];

  return (
    <div className='pt-4'>
      <FormLayout
        layoutTitle='Create Post'
        layoutSubtitle='Fill out the forms'
        handleSubmit={handleCreatePost}
        isEdit={false}
        isLoading={isLoading}
      >
        <InputField
          hasLabel
          type='text'
          label='Title'
          name='title'
          value={post?.title}
          handleChange={handleInputField}
        />
        <SelectField
          hasLabel
          label='Faculty'
          name='faculty'
          value={post?.category}
          handleSelect={handleInputField}
          options={categories}
        />
        <InputField
          hasLabel
          label='Description'
          type='textarea'
          name='desc'
          value={post?.desc}
          handleChange={handleInputField}
          extraStyling='lg:col-span-2'
        />
      </FormLayout>
    </div>
  );
};

export default PostCreate;
