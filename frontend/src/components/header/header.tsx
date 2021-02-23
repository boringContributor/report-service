import {
  Tooltip,
  Button,
  Text,
  useModal,
  Modal,
  Collapse,
  Grid,
  Code,
} from '@geist-ui/react';
import Upload from '@geist-ui/react-icons/upload';
import Dropzone from 'components/dropzone';
import { FC } from 'react';
import ArrowLeft from '@geist-ui/react-icons/arrowLeft';
import { useHistory } from 'react-router-dom';

const Header: FC<{
  info: boolean;
  title?: string;
  canUpload: boolean;
  goBack?: boolean;
}> = ({ info, title = 'Reports', canUpload, goBack = false }) => {
  const { visible, setVisible, bindings } = useModal();
  let history = useHistory();
  const contactFormat = `listing_id, contact_date
1234, 13131`;

  const listingFormat = `id, make, price, mileage, seller_type
1000, "Audi", 49234, 7000, "private"`;

  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12}>
          {goBack && (
            <Tooltip type="dark" placement="bottom" text={'Go back'}>
              <Button
                size="medium"
                style={{
                  border: 'none',
                }}
                onClick={() => history.push('/')}
                iconRight={<ArrowLeft />}
              />
            </Tooltip>
          )}

          <Text style={{ marginLeft: 0 }} h2>
            {title}
          </Text>
        </Grid>

        {canUpload && (
          <Grid xs={12}>
            <Tooltip type="dark" placement="bottom" text={'Upload new report'}>
              <Button onClick={() => setVisible(true)} icon={<Upload />} auto>
                Upload
              </Button>
            </Tooltip>{' '}
          </Grid>
        )}

        {info && (
          <Grid xs={24}>
            <Collapse shadow title="Information">
              <Text>
                Currently two types of csv file structures are allowed. Either
                contacts in the following format:
                <Code block>{contactFormat}</Code>
                <br />
                or listings in the format:
                <Code block>{listingFormat}</Code>
              </Text>
            </Collapse>
          </Grid>
        )}
      </Grid.Container>

      <Modal {...bindings} open={visible} onClose={() => setVisible(false)}>
        <Modal.Title>Upload</Modal.Title>
        <Modal.Subtitle>Create a csv based report</Modal.Subtitle>
        <br />
        <Dropzone setVisible={setVisible} />
      </Modal>
    </>
  );
};

export default Header;
