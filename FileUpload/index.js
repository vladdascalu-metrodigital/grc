import React, {Component} from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FileUploadIcon from '../icons/file-upload.svg';

export default class FileUpload extends Component {

    constructor(props) {
        super(props);
    }

    updateFile = (event) => {
        this.props.updateFile(event.target.files[0]);
        event.target.files = null;
    }

    sendFile = () => {
        this.props.sendFile();
    }
    /*           <div className='button-wrapper'>
                   <label className={classNames('mrc-file-upload', {'disabled': this.props.selectDisabled})}>
                       {this.props.labelSelect}
                       <input type='file' name='file' onChange={this.updateFile} disabled={this.props.selectDisabled}/>
                   </label>
                   <label className={classNames('mrc-file-upload', {'disabled': this.props.uploadDisabled})}>
                       {this.props.labelUpload}
                       <input type='button' name='upload-button' onClick={this.sendFile}
                              disabled={this.props.uploadDisabled}/>
                   </label>
               </div> */
    dropRef = React.createRef()
    state = {
        drag: false
    }

    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: false})
        if (e.dataTransfer.files && e.dataTransfer.files.length === 1) {
            this.props.updateFile(e.dataTransfer.files[0])
        }
    }

    componentDidMount() {
        let div = this.dropRef.current
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }

    componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }

    render() {
        return (
            <div className="mrc-file-upload" ref={this.dropRef}>
                <div className="m-fileDropzone">
                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" height="64" width="48" viewBox="0 0 48 64" className="m-icon blue" style={{"fontSize": "3rem"}}>
                        <g fill="#000" fillRule="evenodd" stroke="none" transform="translate(-8)">
                            <path d="M20.80496 41.88848c.6632 0 1.2.5368 1.2 1.2 0 .6624-.5368 1.2-1.2 1.2h-10.8048c-.6632 0-1.2-.5376-1.2-1.2V1.19968c0-.6624.5368-1.2 1.2-1.2h20.028c.0808 0 .16.0088.2376.024.0616.0128.1184.0328.1752.0536.0168.0064.0336.0088.0496.016.072.0296.1416.0672.2056.1104h.0008c.0656.044.1264.0944.1816.1504.0008.0008.0008.0008.0016.0008l10.8736 10.964.0016.0024.004.0032c.0144.0152.0248.0328.0384.048.0376.0416.0752.0832.1064.1304.0168.0248.028.0528.0424.0784.024.0416.0488.0824.068.1272.0128.0312.02.064.0304.096.0136.0424.0288.0832.0376.1272.012.0576.0152.1176.0184.1768.0008.02.0064.0384.0064.0584v11.1384c0 .6632-.5376 1.2-1.2 1.2-.6632 0-1.2-.5368-1.2-1.2v-9.9328l-9.6768.0208h-.0024c-.3176 0-.6224-.1264-.848-.3504-.2248-.2256-.352-.5304-.352-.8496v-9.7936h-17.628v39.4888h9.6048zM52.0064 33.6748c2.2024 0 3.9936 1.7176 3.9936 3.828v16.0128c0 5.7816-4.68 10.484-10.432 10.484h-6.1568c-7.6672 0-13.5056-8.2248-13.5056-12.3408v-7.428c0-2.1976 1.78-3.9856 3.9688-3.9856l1.7328.0456V33.466c0-2.1496 1.8168-3.8984 4.0504-3.8984.7584 0 1.4592.2144 2.0664.564.656-1.3 2.0328-2.2064 3.636-2.2064 1.5648 0 2.9088.8648 3.584 2.1152.512-.2912 1.0888-.4728 1.7104-.4728 2.0088 0 3.644 1.7296 3.644 3.8544v.5792c.4688-.1928 1.0248-.3264 1.708-.3264zM31.22816 4.11408v6.8768l6.8048-.0152-6.8048-6.8616zM53.6 53.5156V37.5028c0-.7872-.7152-1.428-1.5936-1.428-.9232 0-1.3.4072-1.708.8904v5.3016c0 .6632-.5376 1.2-1.2 1.2-.6632 0-1.2-.5368-1.2-1.2V33.422c0-.8016-.5584-1.4544-1.244-1.4544-.6864 0-1.244.6528-1.244 1.4544v8.8448c0 .6632-.5368 1.2-1.2 1.2-.6624 0-1.2-.5368-1.2-1.2V31.814c0-.8208-.7408-1.4888-1.6504-1.4888-.9104 0-1.6512.668-1.6512 1.4888v10.6488c0 .6624-.5368 1.2-1.2 1.2-.6624 0-1.2-.5376-1.2-1.2V33.466c0-.8256-.7408-1.4984-1.6512-1.4984-.9096 0-1.6504.6728-1.6504 1.4984v16.1928c0 .6632-.5376 1.2-1.2 1.2-.6632 0-1.2-.5368-1.2-1.2v-6.9672l-1.764-.0464c-.8336 0-1.5376.7112-1.5376 1.5856v7.428c0 2.8824 4.8064 9.9408 11.1056 9.9408h6.1568c4.4288 0 8.032-3.6264 8.032-8.084z">
                            </path>
                        </g>
                    </svg>
                    <br />
                    <span>
                        <div className="m-fileDropzone-button">Choose files<input type="file" name='file' onChange={this.updateFile} disabled={this.props.selectDisabled}/></div> to upload or drop them here.
                      </span>
                </div>
                {this.state.dragging}
            </div>
        )
    }
}

FileUpload.propTypes = {
    updateFile: PropTypes.func.isRequired,
    labelUpload: PropTypes.string,
    selectDisabled: PropTypes.bool,
};
