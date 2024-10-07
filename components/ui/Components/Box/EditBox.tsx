import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

interface EditBoxProps {
  open: boolean;
  onClose: () => void;
  record: any | null; // Allow record to be null
  onSave: (updatedRecord: any) => void;
  onAdd: (newRecord: any) => void; // Add a new prop for handling add action
  fieldsConfig: { [key: string]: { type: string; multiline?: boolean } };
  // action: string
}

const EditBox: React.FC<EditBoxProps> = ({
  open,
  onClose,
  record,
  onSave,
  onAdd,
  fieldsConfig,
  // action,
}) => {
  const [editedRecord, setEditedRecord] = useState<any>(record || {});
  const [method, setMethod] = useState(true);

  useEffect(() => {
    if (record) {
      setEditedRecord(record);
      setMethod(true); // If record exists, it's an edit operation
    } else {
      setEditedRecord({}); // If record is null, it's an add operation
      setMethod(false);
    }
  }, [record]);

  const handleFieldChange = (fieldName: keyof any, value: string | number | boolean) => {
    const normalizedValue = fieldsConfig[fieldName as any].type === 'checkbox' ? (value ? 1 : 0) : value;
    setEditedRecord((prevRecord: any) => ({ ...prevRecord, [fieldName]: normalizedValue }));
  };

  const handleSave = () => {
    console.log(method)
    onSave(editedRecord);
    onClose();
  };

  const handleAdd = () => {
    console.log(method)
    onAdd(editedRecord);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>
        {record ? 'Edit Record' : 'Add Record'}
      </DialogTitle>
      <DialogContent >
        <Stack spacing={2} style={{ marginTop: '0px' }}>
          {Object.entries(fieldsConfig).map(([fieldName, fieldProps]) => (
            <React.Fragment key={fieldName}>
              {
                fieldsConfig[(fieldName as any)].type === 'checkbox' ? (
                  <FormControlLabel
                    control={
                      <input
                        type='checkbox'
                        checked={editedRecord ? ((editedRecord as any)[fieldName] == 1 ? true : false) : false}
                        onChange={(e) => handleFieldChange(fieldName as keyof any, e.target.checked)}
                        color="success"
                      />
                    }
                    label={fieldName}
                  />
                ) : fieldsConfig[fieldName].type === 'hidden' ? null : (
                  <div>
                    <label htmlFor="">{fieldName}</label>
                    <textarea
                      style={{
                        padding: '10px',
                        margin: '10px',
                        width: '98%',
                        height: 'auto', // This will make the height dynamic based on content
                        resize: 'vertical', // Allow vertical resizing
                      }}
                      placeholder={fieldName}
                      key={fieldName}
                      value={editedRecord ? (editedRecord as any)[fieldName] || '' : ''}
                      onChange={(e) => handleFieldChange(fieldName as keyof any, e.target.value)}
                    />
                  </div>
                  // <TextField
                  //   style={{ background: theme.primary, color: theme.text, padding: '10px', margin: '10px' }}
                  //   key={fieldName}
                  //   fullWidth
                  //   multiline={fieldProps?.multiline}
                  //   InputLabelProps={{ style: { color: theme.text } }}
                  //   label={fieldName}
                  //   value={editedRecord ? (editedRecord as any)[fieldName] || '' : ''}
                  //   onChange={(e) => handleFieldChange(fieldName as keyof any, e.target.value)}
                  //   InputProps={{ style: { color: theme.text } }}
                  // />
                )}
            </React.Fragment>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={method ? handleSave : handleAdd} color="success">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBox;
