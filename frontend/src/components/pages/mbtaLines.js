// Import necessary modules
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function MBTALines() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios('https://api-v3.mbta.com/routes');
        setLines(result.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>MBTA Lines</h1>
      {lines.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {lines.map(line => (
            <li key={line.id}>
              <Card
                body
                outline
                color="info"
                className="mx-1 my-2"
                style={{ width: "30rem" }}
              >
                <Card.Body>
                  <Card.Title>{line.attributes.long_name}</Card.Title>
                  <Card.Text>Type: {line.attributes.type}</Card.Text>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MBTALines;
