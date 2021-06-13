import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeMute from '@material-ui/icons/VolumeOff';

import AudioManager from "./audio";
import {Howl, Howler} from 'howler';

export default function ContinuousSlider() {
    
    const [value, setValue] = React.useState(10);
    Howler.volume(value / 100);

    const handleChange = (event : any, newValue : any) => {
        if (window.audioManager === undefined) {
            window.audioManager = new AudioManager();
        }

        console.log();
        
        setValue(newValue);
    };
  
    return (
      <div className="volumeSlider">    
        <Typography id="continuous-slider" gutterBottom>
          Volume
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            {
                (value === 0) ?
                 <VolumeMute /> 
                 : 
                 <VolumeDown />
            }
          </Grid>
          <Grid item xs>
            <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
          </Grid>
          <Grid item>
            <VolumeUp />
          </Grid>
        </Grid>
      </div>
    );
}
