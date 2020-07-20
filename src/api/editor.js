import request from '../utils/request';
import {_c} from '../core/config'

const Editor ={}

Editor.upload = (query) => {
    return request({
        url: _c.domain + _c.uploadApi,
        data: (query || {})
    })
}

Editor.edit = (query) => {
    return request({
        url: _c.domain + _c.editorApi,
        data: (query || {})
    })
}


export default Editor;