
import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Popup from './Popup';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSaveSegmentClick = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <div>
      <Button variant="contained" onClick={handleSaveSegmentClick}>
        Save Segment
      </Button>

      <Drawer anchor="right" open={isDrawerOpen} onClose={handleCloseDrawer}>
        <div>
          {<Popup onClose={() => setIsDrawerOpen(false)} />}
        </div>
      </Drawer>
    </div>
  );
}

export default App;
