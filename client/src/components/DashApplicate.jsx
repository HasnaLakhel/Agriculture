import React, { useState, useEffect } from 'react';
import { Table, Button } from 'flowbite-react'; 
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

const DashApplicate = () => {
  const [applicates, setApplicates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/subvention/getallapplicate');
        setApplicates(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  



  const handleAccept = async (id) => {
    try {
      await axios.put(`/api/subvention/accept/${id}`);
      setApplicates((prev) =>
        prev.map((applicate) =>
          applicate._id === id ? { ...applicate, status: 'Accepté' } : applicate
        )
      );
    } catch (error) {
      console.error('Error accepting data:', error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      await axios.put(`/api/subvention/reject/${id}`);
      setApplicates((prev) =>
        prev.map((applicate) =>
          applicate._id === id ? { ...applicate, status: 'Rejetée' } : applicate
        )
      );
    } catch (error) {
      console.error('Error rejecting data:', error);
    }
  };
  
  

  return (
    <div className='table-fixed overflow-x-scroll md:mx-auto p-4 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 table-container' style={{ width: '100%', height: '500px' }}>
      <Table hoverable className='shadow-md' >
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Prename</Table.HeadCell>
          <Table.HeadCell>CIN</Table.HeadCell>
          <Table.HeadCell>Telephone</Table.HeadCell>
          <Table.HeadCell>RIB</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>juridique</Table.HeadCell>
          <Table.HeadCell>Province</Table.HeadCell>
          <Table.HeadCell>Douar</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>

        <Table.Body>
          {applicates.map(applicate => (
            <Table.Row key={applicate._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>{applicate.name}</Table.Cell>
              <Table.Cell>{applicate.prename}</Table.Cell>
              <Table.Cell>{applicate.cin}</Table.Cell>
              <Table.Cell>{applicate.telephone}</Table.Cell>
              <Table.Cell>{applicate.RIB}</Table.Cell>
              <Table.Cell>{applicate.Catégorie}</Table.Cell>
              <Table.Cell>{applicate.juridique}</Table.Cell>
              <Table.Cell>{applicate.Province}</Table.Cell>
              <Table.Cell>{applicate.Douar}</Table.Cell>
              <Table.Cell>{applicate.status}</Table.Cell>
              <Table.Cell>
                {applicate.status === 'Pending' && (
                  <>
                    <Button
                      onClick={() => handleAccept(applicate._id)}
                      color='success'size='sm' className='mr-2'>Accept </Button>
                    <Button
                      onClick={() => handleReject(applicate._id)}
                       color='failure'  size='sm' >  Reject</Button>
                  </>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DashApplicate;
