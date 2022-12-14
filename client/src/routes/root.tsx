import Button from '@mui/material/Button';

export default function Root() {
    return (
        <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#AAAAAA', padding: '5%', margin: '5%', borderRadius: '25px' }}>
                <Button style={{ margin: '10%', textAlign: 'center' }} href='/demo' variant="contained">View Demo</Button>
                <Button style={{ margin: '10%', textAlign: 'center' }} href='/data' variant="contained">View Data</Button>
                <Button style={{ margin: '10%', textAlign: 'center' }} href='/dashboard' variant="contained">View Layout</Button>
            </div>
        </div>
    );
}