import React from 'react'
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export default class BehindCamera extends React.Component {
    state = {
        hasCameraPermission: null,
      }
      componentDidMount() {
        this.askForPermission()
      }
    
      askForPermission = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { status } = await Permissions.getAsync(Permissions.CAMERA)
    
        this.setState({ hasCameraPermission: status === 'granted' });
      }
      
    render() {
        return (
            <Camera
                ref={ref => { this.camera = ref }}
                style={{
                    width: '100%',
                    height: 0
                }}
                type={Camera.Constants.Type.front}
                onFacesDetected={this.props.faceDetecting ? this.props.onFacesDetected : undefined}
                faceDetectorSettings={{
                    mode: FaceDetector.Constants.Mode.accurate,
                    detectLandmarks: FaceDetector.Constants.Landmarks.all,
                    runClassifications: FaceDetector.Constants.Classifications.all,
                    minDetectionInterval: 100,
                    tracking: true,
                }}
            >
            </Camera>
        )
    }
}