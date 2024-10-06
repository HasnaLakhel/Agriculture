import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';

const Application = () => {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/app/getallapp');
        setApps(response.data.Apps);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const cardColors = ["#d8fc60", "#36ff75", "#f78dc7", "#9cd4f7"];

  const handleButtonClick = () => {
    navigate('/applicate');
  };

  // Function to render content as a list of statements
  const renderContentAsList = (content) => {
    if (!content) return null;
    const statements = content.split('\n');
    return (
      <ul className="list-disc ml-6">
        {statements.map((statement, index) => (
          <li key={index}>{statement}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container mx-auto px-3 py-8">
      <h1 className="text-center text-3xl my-3 font-semibold text-green-500 relative">LES AIDES FINANCIERES DE L'ÉTAT</h1>
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        {apps.map((app, index) => (
          <div key={app._id} className={`rounded overflow-hidden shadow-md bg-white p-6 flex flex-col justify-between border-2 border-green-500 justify-self-end`}
            style={{ backgroundColor: cardColors[index % cardColors.length], width: '500px' }}>
            <div>
              <h1 className="text-lg font-semibold mb-9 text-center mt-3">{app.title}</h1>

              <div className="text-lg mb-5 mt-3">
                {renderContentAsList(app.content)}
              </div>

              <p className="text-lg text-gray-800 mb-4 mt-3">Created At: {new Date(app.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button className="border border-green-500 hover:bg-green-200 text-white" onClick={handleButtonClick}>
          Saisir votre demande
        </Button>
      </div>
    </div>
  );
};

export default Application;

