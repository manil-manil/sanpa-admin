import React, {useState, useEffect} from "react";

import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import { BASIC_CONSTANT } from "../../variables/basic.constants";
import { useFetchWrapper } from '../../helpers';

function UserEdit({inputs:{username,profileImageUrl}, onChange}){
    const fetchWrapper = useFetchWrapper();
    const [image, setImage] = React.useState(profileImageUrl);
    const onLoadFile = (e) => {
        const formData = new FormData();
        formData.append('multipartFile',e.target.files[0])
        fetchWrapper.post(`${BASIC_CONSTANT.BACKEND_URL}/image`,formData,'formData')
        .then(response=>{
            if(response[0]){
                setImage(`https://api.sanpa.co.kr/image?name=${response[0]}`);
                onChange({
                    target:{
                        name:'profileImageUrl',
                        value:`https://api.sanpa.co.kr/image?name=${response[0]}`
                    }
                })
            }
        })
    }
    return(
    <div className="card-body">
        <form>
            <div className="form-group">
                <label>이름</label>
                <input name="username" type="text" placeholder="이름을 입력해주세요." onChange={onChange} value={username} className={`form-control`} />
            </div>
            <div className="form-group">
                <label>프로필 이미지</label>
                <input 
                type="file" 
                style={{display:"block"}} 
                accept="img/*"
                onChange={onLoadFile}
                />
                <img style={{marginTop:`${10}px`}} src={image}/>
            </div>
        </form>
    </div>
    )
}

export default UserEdit;