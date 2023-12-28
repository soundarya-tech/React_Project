import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material';

const Popup = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [newSchema, setNewSchema] = useState('');
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ]);
  const [isBlueBoxVisible, setIsBlueBoxVisible] = useState(false);

  const handleAddNewSchema = () => {
    if (newSchema) {
      setSelectedSchemas([...selectedSchemas, { [newSchema]: newSchema }]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema.value !== newSchema)
      );
      setNewSchema('');
      setIsBlueBoxVisible(true);
    }
  };

  const handleRemoveSchema = (index) => {
    const updatedSchemas = [...selectedSchemas];
    const removedSchema = updatedSchemas.splice(index, 1)[0];
    setAvailableSchemas([
      ...availableSchemas,
      { [removedSchema[newSchema]]: removedSchema[newSchema] },
    ]);
    setSelectedSchemas(updatedSchemas);
  };

  const handleClearNewSchema = () => {
    setNewSchema('');
    setIsBlueBoxVisible(false);
  };

  const handleSaveSegment = () => {
    // data to be sent to the server
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => {
        const key = Object.keys(schema)[0];
        return { [key]: schema[key] };

      }),

    };
    console.log(data)

    const webhookUrl = 'https://webhook.site/2ca8b7b8-a13c-4b63-9530-7e8f54bf3be9';


    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Data sent successfully:', responseData);

      })
      .catch((error) => {
        console.error('Error sending data:', error);

      });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Saving Segment</Typography>
        </Toolbar>
      </AppBar>
      {/* Popup */}
      <div style={{ border: '2px solid white', padding: '10px', margin: '10px' }}>
        <TextField
          fullWidth
          label="Name of the Segment"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />
        <br />

        {/* Display new dropdowns */}
        {isBlueBoxVisible && (
          <div style={{ border: '2px solid blue', padding: '10px', margin: '10px' }}>
            {selectedSchemas.map((schema, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <FormControl fullWidth>
                  <InputLabel>{Object.values(schema)[0]}</InputLabel>
                  <Select fullWidth>
                    <MenuItem value="">{Object.values(schema)[0]}</MenuItem>
                    {availableSchemas.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveSchema(index)}
                  style={{ marginLeft: '10px' }}
                >
                  -
                </Button>
              </div>
            ))}
          </div>
        )}
        <br />
        <FormControl fullWidth>
          <InputLabel>Add Schema to Segment</InputLabel>
          <Select value={newSchema} onChange={(e) => setNewSchema(e.target.value)}>
            <MenuItem value="" disabled>
              Add Schema to Segment
            </MenuItem>
            {availableSchemas.map((schema, index) => (
              <MenuItem key={index} value={schema.value}>
                {schema.label}
              </MenuItem>
            ))}
          </Select>
          {newSchema && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearNewSchema}
            >
              -
            </Button>
          )}
        </FormControl>

        <br />
        <br />

        <Button variant="contained" onClick={handleAddNewSchema}>
          + Add new schema
        </Button>
        <br />
        <br />

        <Button variant="contained" color="primary" onClick={handleSaveSegment}>
          Save the Segment
        </Button>
        {' '}
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Popup;
