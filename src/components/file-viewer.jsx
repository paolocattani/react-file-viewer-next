
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withFetching from './fetch-wrapper'
import {
    PDFViewer,
    PhotoViewerWrapper,
    DocxViewer,
    CsvViewer,
    XlsxViewer
} from './drivers';

class FileViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        const container = document.getElementById('pg-viewer');
        const height = container ? container.clientHeight : 0;
        const width = container ? container.clientWidth : 0;
        this.setState({ height, width });
    }

    getDriver() {
        switch (this.props.fileType) {
            case 'csv': {
                return withFetching(CsvViewer, this.props);
            }
            case 'xlsx': {
                const newProps = Object.assign({}, this.props, { responseType: 'arraybuffer' });
                return withFetching(XlsxViewer, newProps);
            }
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'bmp':
            case 'png': {
                return PhotoViewerWrapper;
            }
            case 'pdf': {
                return PDFViewer;
            }
            case 'docx': {
                return DocxViewer;
            }
            default: {
                return null;
            }
        }
    }

    render() {
        const Driver = this.getDriver(this.props);
        return (
            <div className="pg-viewer-wrapper">
                <div className="pg-viewer" id="pg-viewer">
                    <Driver {...this.props} width={this.state.width} height={this.state.height} />
                </div>
            </div>
        );
    }
}

FileViewer.propTypes = {
    fileType: PropTypes.string.isRequired,
    filePath: PropTypes.string.isRequired,
    onError: PropTypes.func,
    errorComponent: PropTypes.element,
    unsupportedComponent: PropTypes.element,
};

FileViewer.defaultProps = {
    onError: () => null,
    errorComponent: null,
    unsupportedComponent: null,
};

export default FileViewer;
