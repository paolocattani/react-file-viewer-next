
import React, { Component } from 'react';

import * as THREE from 'three';
import PhotoViewer from './photo-viewer';
import Loading from '../loading';

function getPhotoDriver(width, height, fileType) {
  return PhotoViewer;
}

export default class PhotoViewerWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalWidth: 0,
      originalHeight: 0,
      imageLoaded: false,
    };
  }

  componentDidMount() {
    // spike on using promises and a different loader or adding three js loading manager
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = '';
    // load a resource
    loader.load(
      // resource URL
      this.props.filePath,
      // Function when resource is   loaded
      (texture) => {
        this.setState({
          originalWidth: texture.image.width,
          originalHeight: texture.image.height,
          imageLoaded: true,
          texture,
        });
      },
      (xhr) => {
        console.log(`${xhr.loaded / xhr.total * 100}% loaded`);
      },
      (xhr) => {
        console.log('An error happened', xhr);
      },
    );
  }

  render() {
    if (!this.state.imageLoaded) {
      return <Loading />;
    }
    const { originalWidth, originalHeight } = this.state;
    const PhotoDriver = getPhotoDriver(originalWidth, originalHeight, this.props.fileType);

    return (
      <PhotoDriver {...this.state} {...this.props} />
    );
  }
}
