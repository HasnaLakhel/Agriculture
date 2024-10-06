import React, { useState, useEffect } from 'react';
import { Table, Button } from 'flowbite-react';

function DashApp() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const response = await fetch('/api/app/getallapp');
      if (!response.ok) {
        throw new Error('Failed to fetch apps');
      }
      const data = await response.json();
      setApps(data.Apps);
    } catch (error) {
      console.error('Error fetching apps:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/app/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setApps(prevApps => prevApps.filter(app => app._id !== id));
      } else {
        console.error('Failed to delete app');
      }
    } catch (error) {
      console.error('Error deleting app:', error);
    }
  };


  const renderContentAsList = (content) => {
    if (!content) return null;
    const statements = content.split('\n'); 
    return (
      <ul>
        {statements.map((statement, index) => (
          <li key={index}>{statement}</li>
        ))}
      </ul>
    );
  };


  return (
    <div className='table-fixed overflow-x-scroll md:mx-auto p-4 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 table-container' style={{ width: '100%', height: '500px' }}>
      <Table hoverable className='shadow-md' >
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Content</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>

        {apps.map(app => (
          <Table.Body className='divide-y' key={app._id}>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>
                {app.title}
              </Table.Cell>
              <Table.Cell>
                {renderContentAsList(app.content)}
              </Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() => handleDelete(app._id)}
                  color='failure'
                  size='sm'
                  className='hover:bg-red-500 hover:text-white'
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
}

export default DashApp;
