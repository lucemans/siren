import * as React from 'react';
import SelectionList from './SelectionList';

// Create WebSocket connection.
const socket = new WebSocket('wss://siren-api.lvk.sh:81');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

const LED = 1;

export default function App(): JSX.Element {

    let [lightState, setLightState] = React.useState('1');
    let [defconState, setDefcon] = React.useState('0');
    let [enabledState, setEnabled] = React.useState('0');


    function updateSettings() {
        console.log('sending update');
        if (enabledState == '0') {
            socket.send('c' + LED + '0');
            socket.send('cb' + '0');
            document.getElementById('root').classList.remove('act');
        } else {
            socket.send('c' + LED + lightState);
            socket.send('cb' + defconState);
            document.getElementById('root').classList.add('act');
        }
    }

    return (
        <div className="app flex">
            <SelectionList label="Light" options={[
                { label: 'Solid', value: '1' },
                { label: 'Blinking', value: '2' },
                { label: 'Blinking (Alternate)', value: '3' }
            ]} onChanged={(e) => { setLightState(e); lightState = e; updateSettings(); }} value={lightState} />
            <SelectionList label="DEFCON" options={[
                { label: 'Level 0', value: '0' },
                { label: 'Level 1', value: '1' },
                { label: 'Level 2', value: '2' },
                { label: 'Level 3', value: '3' },
                { label: 'Level 4', value: '4' },
                { label: 'Level 5', value: '5' }
            ]} onChanged={(e) => { setDefcon(e); defconState = e; updateSettings(); }} value={defconState} />
            <SelectionList label="State" options={[
                { label: 'Enabled', value: '1' },
                { label: 'Disabled', value: '0' }
            ]} onChanged={(e) => { setEnabled(e); enabledState = e;  updateSettings(); }} value={enabledState} />
        </div>
    );
}