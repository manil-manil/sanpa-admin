import React, { useState, useEffect } from "react";
import { BASIC_CONSTANT } from "../../variables/basic.constants";
import { useFetchWrapper } from "../../helpers";

function QuestionEdit({ inputs, onChange }) {
    const fetchWrapper = useFetchWrapper();
    const onLoadFile = (e) => {
        const formData = new FormData();
        formData.append("multipartFile", e.target.files[0]);
        fetchWrapper
            .post(`${BASIC_CONSTANT.BACKEND_URL}/image`, formData, "formData")
            .then((response) => {
                if (response[0]) {
                    // setCategoryImage(
                    //     `https://api.sanpa.co.kr/image?name=${response[0]}`
                    // );
                    onChange({
                        target: {
                            name: "image",
                            value: `https://api.sanpa.co.kr/image?name=${response[0]}`,
                        },
                    });
                }
            });
    };
    console.log(inputs);
    return (
        <div className="card-body">
            <form>
                <div className="form-group">
                    <label>활성화 여부</label>
                    <div className="row">
                        <div className="ml-4">
                            <label className="mr-2">활성화</label>
                            <input
                                type="radio"
                                name="isActive"
                                value="1"
                                defaultChecked={inputs?.isActive}
                            />
                        </div>
                        <div className="ml-4">
                            <label className="mr-2">비활성화</label>
                            <input
                                type="radio"
                                name="isActive"
                                value="0"
                                defaultChecked={!inputs?.isActive}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>이름</label>
                    <input
                        name="title"
                        type="text"
                        placeholder="이름을 입력해주세요."
                        onChange={onChange}
                        value={inputs?.title}
                        className={`form-control`}
                    />
                </div>
                <div className="form-group">
                    <label>이미지</label>
                    <input
                        type="file"
                        style={{ display: "block" }}
                        accept="img/*"
                        onChange={onLoadFile}
                    />
                    <img
                        style={{ marginTop: `${10}px` }}
                        src={inputs?.imageUrl}
                    />
                </div>
            </form>
        </div>
    );
}

export default QuestionEdit;
