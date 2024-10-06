import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationStatus = () => {
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('/api/subvention/status');
        setApplicationData(response.data);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };
    fetchStatus();
  }, []);


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800"> demande de subvention</h2>
      
      {applicationData ? (
        <>
          <div className="bg-blue-100 rounded-md p-4 mb-6">
            <p className="text-lg text-green-700">
            Le statut de votre demande est : <strong>{applicationData.status}</strong>
            </p>
          </div>
          <div className="bg-gray-100 rounded-md p-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Informations sur la demande</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>Name:</strong> {applicationData.application.name}
              </li>
              <li>
                <strong>Prename:</strong> {applicationData.application.prename}
              </li>
              <li>
                <strong>CIN:</strong> {applicationData.application.cin}
              </li>
              <li>
                <strong>Telephone:</strong> {applicationData.application.telephone}
              </li>
              <li>
                <strong>Catégorie:</strong> {applicationData.application.Catégorie}
              </li>
              <li>
                <strong>Juridique:</strong> {applicationData.application.juridique}
              </li>
              <li>
                <strong>Province:</strong> {applicationData.application.Province}
              </li>
              <li>
                <strong>Douar:</strong> {applicationData.application.Douar}
              </li>
            </ul>
          </div>
        </>
      ) : (
        <p className="text-lg text-gray-800">Elle n'a fait aucune demande...</p>
      )}
    </div>
  );
};

export default ApplicationStatus;
