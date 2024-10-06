import React from 'react';
import { Alert, Button, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useSelector } from 'react-redux'; 
import { useNavigate, Link } from 'react-router-dom'; 

const Applicate = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);

      const res = await fetch('/api/subvention/applicate', {
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
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/complete`);
      }
    } catch (error) {
      console.error("Error:", error);
      setPublishError('Something went wrong');
    }
  };

  return (
    <>
      {currentUser ? (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
          <h1 className='text-center text-4xl my-9 font-semibold text-green-500 relative'>
          Fonds de Développement Agricole   - صندوق التنمية الفلاحية</h1>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
            <TextInput type='text' placeholder='Name' required id='name'
              className='flex-1' onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <TextInput type='text' placeholder='prename' required id='prename'
              className='flex-1' onChange={(e) => setFormData({ ...formData, prename: e.target.value })} />
            <TextInput type='text' placeholder='cin' required id='cin'
              className='flex-1' onChange={(e) => setFormData({ ...formData, cin: e.target.value })} />
            <TextInput type='number' placeholder='telephone' required id='telephone'
              className='flex-1' onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} />
              <TextInput type='number' placeholder='RIB' required id='RIB'
              className='flex-1' onChange={(e) => setFormData({ ...formData, RIB: e.target.value })} />
              <Select onChange={(e) => setFormData({ ...formData, Province: e.target.value })}>
              <option value='uncategorized'>--Choisir--</option>
              <option value='Al Haouz'>Al Haouz - إقليم: الحوز</option>
              <option value='Chichaoua'>Chichaoua - إقليم: شيشاوة</option>
              <option value='El Kelâa des Sraghna'>El Kelâa des Sraghna - إقليم: قلعة السراغنة</option>
              <option value='Essaouira'>Essaouira - إقليم: الصويرة</option>
              <option value='Marrakech'>Marrakech - عمالة: مراكش</option>
              <option value='Rehamna'>Rehamna - إقليم: الرحامنة</option>
              <option value='Safi'>Safi - إقليم: آسفي</option>
              <option value='Youssoufia'>Youssoufia - إقليم: اليوسفية</option>
            </Select>

            <TextInput type='text' placeholder='Douar' required id='Douar'
              className='flex-1' onChange={(e) => setFormData({ ...formData, Douar: e.target.value })} />

            <Select onChange={(e) => setFormData({ ...formData, Catégorie: e.target.value })}>
              <option value='uncategorized'>Choisir a category</option>
              <option value='Agriculteur '>  Agriculteur فلاح </option>
              <option value='Agrégateur'>  Agrégateur مجمع</option>
            </Select>



            <Select onChange={(e) => setFormData({ ...formData,juridique : e.target.value })}>
              <option value='uncategorized'>  Personnalité juridique</option>
              <option value='seul '>  1 seul agriculteur) - شخص ذاتي(فلاح واحد) </option>
              <option value='plus'>2 agriculteurs ou plus (فلاحين او أكثر ) </option>
              <option value='Agrégateur'>  Personne morale - شخص معنوي</option>
            </Select>
            <Button className='my-5' type='submit' gradientDuoTone='greenToBlue'>
              Publish
            </Button>

            {publishError && (
              <Alert className='mt-5' color='failure'>
                {publishError}
              </Alert>
            )}

          </form>
        </div>
      ) : (



        <div class="min-h-screen flex flex-grow items-center justify-center">
          <div class=" rounded-lg bg-gray-100 p-8 text-center shadow-2xl h-96 w-98">
            <h1 class="mt-12  mb-12 text-4xl font-bold">Vous devez être signé.</h1>
            <a href="/sign-in" class=" inline-block rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-300">Sign In</a>
          </div>
        </div>

      )}



    </>
  )
}

export default Applicate;
