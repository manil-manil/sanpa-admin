import React, {useState, useEffect} from "react";

import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
function UserEdit({inputs:{username,profileImageUrl}, onChange}){

    return(
    <div className="card-body">
        <form>
            <div className="form-group">
                <label>이름</label>
                <input name="username" type="text" placeholder="이름을 입력해주세요." onChange={onChange} value={username} className={`form-control`} />
            </div>
            <div className="form-group">
                <label>프로필 이미지 url</label>
                <input name="profileImageUrl" type="text" placeholder="프로필 이미지 url을 입력해주세요." onChange={onChange} value={profileImageUrl} className={`form-control`} />
            </div>
        </form>
    </div>
    )
}

export default UserEdit;