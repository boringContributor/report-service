import { useMemo, FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Modal, useToasts, Note } from '@geist-ui/react';
import axios from 'axios';
const baseStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const Dropzone: FC<{ setVisible: (visible: boolean) => void }> = ({
  setVisible,
}) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'text/csv',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [, setToast] = useToasts();

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.type}>
      {file.type} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.type}>
      {file.type} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      await axios.post('/v1/report', formData, {
        headers: {
          'Content-Type': 'text/csv',
        },
      });
      setToast({
        text: 'Succesfully uploaded csv file',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Could not upload csv file',
        type: 'error',
      });
    }

    setVisible(false);
    setIsLoading(false);
  };

  return (
    <>
      {acceptedFiles.length === 0 && (
        <>
          <Note type="warning">Please select a csv file.</Note>
          <br />
        </>
      )}
      <section className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop a csv file here, or click to select one</p>
          <em>(Only one *.csv file will be accepted)</em>
        </div>
        <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>
      </section>
      <Modal.Action passive onClick={() => setVisible(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action
        disabled={isLoading || acceptedFiles.length === 0}
        loading={isLoading}
        passive
        onClick={() => onSubmit()}
      >
        Submit
      </Modal.Action>
    </>
  );
};

export default Dropzone;
