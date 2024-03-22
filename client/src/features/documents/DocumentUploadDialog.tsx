import { ChangeEvent, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import UploadFile from '../../components/UploadFile';
import { useUpload } from './useUpload';

type TDocumentUploadDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DocumentUploadDialog({ open, setOpen }: TDocumentUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const { isLoading, uploadFile } = useUpload();
  const queryClient = useQueryClient();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const confirmUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    uploadFile(formData, {
      onSuccess: () => {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ['documents'] });
      },
    });
  };

  const handleClose = () => {
    if (!isLoading) setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="upload-modal">
      <DialogTitle>Upload a document</DialogTitle>
      <DialogContent>
        <UploadFile onChange={handleChange} />
        <DialogActions>
          <Button disabled={isLoading} onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton loading={isLoading} onClick={confirmUpload}>
            Confirm
          </LoadingButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
