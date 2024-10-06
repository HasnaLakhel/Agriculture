import React, { useState } from 'react';
import { Alert, Button, TextInput, Textarea } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';


const CreateApp = () => {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);

      const res = await fetch('/api/app/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log("Response:", res);
      const data = await res.json();
      console.log("Data:", data);

      if (!res.ok) {
        setPublishError(data.message || 'Failed to publish');
        return;
      }

      setPublishError(null);
      navigate(`/application`);
    } catch (error) {
      console.error("Error:", error);
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-4xl my-9 font-semibold text-green-500 relative'>
      Créer un Subvention
      </h1>
      <form className='flex flex-col gap-4 mb-8' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text' placeholder='Title' required id='title' className='flex-1'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        </div>

        <div className='flex flex-col gap-4 sm:flex-row justify-betwecontenten'>
          <Textarea rows="6" type='text' placeholder='content' required id='title' className='flex-1'
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}>
          </Textarea>
        </div>


        <Button type='submit' gradientDuoTone="greenToBlue">
          Publish
        </Button>

        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default CreateApp;
