import React, { useEffect, useState } from 'react';
import { Upload, Modal, message, Row, Col, Button } from 'antd';
import { SaveOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import * as bannerApi from '../../api/bannerApi';
import request from '../../api/baseApi';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function BannerForm(props) {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const convertData = (dataRaw) => {
        return dataRaw.map(data => {
            return {
                ...data,
                status: 'done',
                url: data.bannerImage,
                uid: data.id
            }
        })
    }
    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        fmData.append("file", file);
        try {
            const res = await request().post(
                "/file/upload",
                fmData,
                config
            );

            onSuccess(res.data.data);
        } catch (err) {
            const error = new Error("Some error");
            onError({ err });
        }
    };
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const  handleSave = async () =>{
        if(banners.length ==0 )
        {
            message.error('Bạn chưa thêm banner nào cả');
            return ;
        }

        const request = [];
        for (let index = 0; index < banners.length; index++) {
            const element = banners[index];
            request.push({
                image: element.url,
                order: index + 1 
            });
        }
        try {
            setLoading(true);
            const banner = await bannerApi.updateBanner({banners:request});
            if (banner.status === 200) {
                message.success('Cập nhật banner thành công');
            }
        } catch (e) {
            message.error('Lỗi khi cập nhật banner');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const getBanner = async () => {
            try {
                setLoading(true);
                const banner = await bannerApi.getAllBanner();
                if (banner.status === 200) {
                    if (banner.data.data) {
                        setBanners(convertData(banner.data.data));
                    }
                }
            } catch (e) {
                message.error('Đã có lỗi xảy ra khi lấy banner');
            } finally {
                setLoading(false);
            }
        }
        getBanner();
    }, []);
    const handleCancel = () => setPreviewVisible(false);
    const handleChange = ({file,fileList,event}) => {
        if(file.status === 'done'){
            const currentFileIndx = fileList.findIndex(x=>x.uid === file.uid);
            if(currentFileIndx != -1){
                fileList[currentFileIndx].url = file.response;
            }
        }
        setBanners(fileList);
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (<>
        <Row>
            <Col flex="auto">
                <Button
                    icon={<SaveOutlined />}
                    type="primary"
                    style={{ float: 'right' }}
                    onClick={handleSave}
                >
                    Lưu
                </Button>
            </Col>
        </Row>
        <Upload.Dragger
            listType="picture-card"
            fileList={banners}
            onPreview={handlePreview}
            onChange={handleChange}
            customRequest={uploadImage}
            multiple={true}
            accept={'.jpg,.png'}
        >
            {uploadButton}
        </Upload.Dragger>
        <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
        >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
    </>)
}