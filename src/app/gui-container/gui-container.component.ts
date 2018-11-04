import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  Testability
} from '@angular/core';

import * as THREE from 'three';
import {
  OrbitControls
} from 'three-orbitcontrols-ts';

@Component({
  selector: 'app-gui-container',
  templateUrl: './gui-container.component.html',
  styleUrls: ['./gui-container.component.css']
})
export class GuiContainerComponent implements AfterViewInit {

  @ViewChild('wrapper')
  wrapperElement: ElementRef;

  scene: THREE.Scene;
  renderer;

  camera;
  cameraHelper;

  directorCamera;
  activeCamera;

  cameraRig;

  mesh;
  cube;
  line;
  points: THREE.Points[];

  directorCameraRotateX: number;

  frameCounter = 0;

  constructor() {}

  ngAfterViewInit() {
    // Create scene
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();

    // Set Cameras
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.camera.position.y = 1;

    this.activeCamera = this.camera;

    this.cameraHelper = new THREE.CameraHelper(this.camera);
    // this.scene.add(this.cameraHelper);


    this.directorCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 4);
    this.directorCamera.position.y += 4;
    this.directorCamera.rotation.x = 270 * Math.PI / 180;


    const dirCameraHelper = new THREE.CameraHelper(this.directorCamera);
    this.scene.add(dirCameraHelper);

    this.cameraRig = new THREE.Group();
    this.cameraRig.add(this.camera);
    this.cameraRig.add(this.directorCamera);
    this.scene.add(this.cameraRig);

    // const directorCameraHelper = new THREE.CameraHelper( this.directorCamera );
    // this.scene.add(directorCameraHelper);

    // console.log(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth - 100, window.innerHeight - 100);

    this.wrapperElement.nativeElement.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });
    this.cube = new THREE.Mesh(geometry, material);
    // this.scene.add(this.cube);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0000ff
    });

    const lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3(0, 1, 0));
    lineGeometry.vertices.push(new THREE.Vector3(1, 1, 0));
    lineGeometry.vertices.push(new THREE.Vector3(1, 0, 0));
    lineGeometry.vertices.push(new THREE.Vector3(2, 0, 0));

    this.line = new THREE.Line(lineGeometry, lineMaterial);
    this.scene.add(this.line);

    const gridColor = new THREE.Color('#c0c0c0');
    const gridHelper = new THREE.GridHelper(10, 10, gridColor);
    this.scene.add(gridHelper);

    // HELPER ZONE
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    const linePerspGeo = new THREE.Geometry();
    linePerspGeo.vertices.push(new THREE.Vector3(0, 4, 0));
    linePerspGeo.vertices.push(new THREE.Vector3(0, 4, -5));

    const linePersp = new THREE.Line(linePerspGeo, lineMaterial);
    this.scene.add(linePersp);

    // Add a point
    // const dotGeometry = new THREE.Geometry();
    // dotGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    // dotGeometry.vertices.push(new THREE.Vector3(1, 1, 1));
    // dotGeometry.vertices.push(new THREE.Vector3(1, 1, 0));
    // const dotMaterial = new THREE.PointsMaterial({
    //   size: 1,
    //   sizeAttenuation: false
    // });

    // const dot = new THREE.Points(dotGeometry, dotMaterial);
    // this.scene.add(dot);


    // animate
    this.animate();

    // Adding a cube
    // const geometry = new THREE.BoxGeometry(200, 200, 200);
    // const material = new THREE.MeshPhongMaterial({
    //   color: 0x0033ff
    // });
    // this.mesh = new THREE.Mesh(geometry, material);

    // this.scene.add(this.mesh);
  }

  private animate(): void {
    window.requestAnimationFrame(() => this.animate());

    // this.line.rotation.x += 0.01;
    this.line.rotation.y += 0.01;
    // this.directorCamera.rotation.x -= 0.005;


    if (this.frameCounter % 60 === 0) {
      console.log('TAC');
      // this.directorCamera.rotation.y -= 2 * Math.PI / 180;
      // this.directorCamera.rotation.x -= 2 * Math.PI / 180;
      // this.directorCamera.rotation.x += 100;
      this.directorCameraRotateX = this.directorCamera.rotation.x;
    }
    this.frameCounter++;

    // if (this.activeCamera === this.camera) {
    //   this.camera.updateProjectionMatrix();
    //   this.cameraHelper.update();

    // } else {
    //   this.directorCamera.updateProjectionMatrix();
    // }

    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('document:keydown.ArrowLeft', ['$event'])
  goLeft(event: KeyboardEvent) {
    console.log('goLeft');
    this.camera.position.x -= 0.05;
  }

  @HostListener('document:keydown.ArrowRight', ['$event'])
  goRight(event: KeyboardEvent) {
    console.log('goRight');
    this.camera.position.x += 0.05;
  }

  @HostListener('document:keydown.ArrowUp', ['$event'])
  goAhead(event: KeyboardEvent) {
    this.camera.position.z -= 0.05;
  }

  @HostListener('document:keydown.ArrowDown', ['$event'])
  goBack(event: KeyboardEvent) {
    this.camera.position.z += 0.05;
  }

  @HostListener('document:keydown.q', ['$event'])
  goUp(event: KeyboardEvent) {
    // console.log('goUp');
    this.camera.position.y += 0.05;
  }

  @HostListener('document:keydown.a', ['$event'])
  goDown(event: KeyboardEvent) {
    // console.log('goDown');
    this.camera.position.y -= 0.05;
  }

  setNormalView() {
    console.log('Normal');
    this.activeCamera = this.camera;
  }
  setAngleView() {
    console.log('Angle');
    this.activeCamera = this.directorCamera;
  }

}
