import { useDropzone } from 'react-dropzone';


const style = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: '20px auto',
    },
    dropzone: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: '20px',
      borderWidth: '2px',
      borderRadius: '2px',
      borderColor: '#eeeeee',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      transition: 'border .24s ease-in-out',
    },
    dropzoneActive: {
      borderColor: '#2196f3',
    },
    dropzoneAccept: {
      borderColor: '#00e676',
    },
    dropzoneReject: {
      borderColor: '#ff1744',
    },
  };

function EmployeFiles() {


    const onDrop = async (filesAccepted, rejectedFiles) => {}

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		multiple: true,
		onDrop
	});
    
    return (
        <>
          <h3 style={{ marginLeft: 20, marginTop: 20 }}>Archivos del empleado</h3>
          <section className="container" style={{ marginLeft: '20px', marginTop: '20px'}}>
              <div {...getRootProps({ style })}>
                  <input {...getInputProps()} style={{ width: '500px', height: 100, display: 'flex', justifyContent: 'center', alignContent: 'center', background: '#cecfd0' }} />
              </div>
          </section>
        </>
    );
}

export default EmployeFiles;