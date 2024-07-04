import React, { useState, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import { login, register, loginWithGithub, loginWithGoogle } from '../api/firebase';
import { uploadImage } from "../api/cloudinary";
import { MuiFileInput } from 'mui-file-input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': { padding: theme.spacing(2), },
  '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [userInfo, setUserInfo] = useState({email:'', password:'', name:'', photo:''});
  const [isLoginMode, setIsLoginMode] = useState(true);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); setIsLoginMode(true); };
  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  const handleSubmit = () => { 
    if (isLoginMode)
      login(userInfo); 
    else
      register(userInfo);
  }
  const handleMode = () => { setIsLoginMode(!isLoginMode); }
  const handleUpload = newFile => {
    setFile(newFile);
    uploadImage(newFile)
      .then(url => setUserInfo({...userInfo, ['photo']: url}));
  }

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        로그인
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>
            {isLoginMode ? '로그인' : '회원가입'}
          </Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8,
            color: (theme) => theme.palette.grey[500], }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            component="form" noValidate autoComplete="off"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
          >
            <TextField
              required label="Email" defaultValue={userInfo.email} id="outlined-required"
              name='email' onChange={handleChange}
            />
            <TextField
              label="Password" required defaultValue={userInfo.password} id="outlined-password-input"
              type="password" name='password' onChange={handleChange}
            />
            <div style={{display: isLoginMode ? 'none' : 'block', alignItems: 'center'}}>
              <TextField
                required label="Nickname" defaultValue={userInfo.name} id="outlined-required"
                name='name' onChange={handleChange} 
              />
              <MuiFileInput label='프로필 사진' value={file} name='file' onChange={handleUpload} />
            </div>
          </Box>
          <Typography sx={{ p: 2 }}>
            {isLoginMode ? '아직 회원가입을 안하셨나요?' : '이미 회원이신가요?'}
            <a href='javascript:void(0)' onClick={handleMode} style={{marginLeft:'20px'}}>
              {isLoginMode ? '회원가입' : '로그인'}
            </a>
          </Typography> 
          <Stack direction={'row'} spacing={2} sx={{ ml: 2, mt: 2}}>
            <a href='javascript:void(0)' onClick={loginWithGoogle}>
              <img src='/img/google-logo.png' alt='google' width={32} />
            </a>
            <a href='javascript:void(0)' onClick={loginWithGithub}>
              <img src='/img/github-logo.png' alt='github' width={32} />
            </a>
            <img src='/img/insta-logo.png' alt='instagram' width={32} />
            <img src='/img/kakao-logo.png' alt='kakao' width={32} />
            <img src='/img/naver-logo.jpg' alt='naver' width={32} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} variant="contained">
            {isLoginMode ? '로그인' : '회원가입'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
}