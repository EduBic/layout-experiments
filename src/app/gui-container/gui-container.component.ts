import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';

import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

@Component({
  selector: 'app-gui-container',
  templateUrl: './gui-container.component.html',
  styleUrls: ['./gui-container.component.css']
})
export class GuiContainerComponent implements AfterViewInit {

  @ViewChild('wrapper')
  wrapperElement: ElementRef;

  scene: THREE.Scene;
  camera;
  renderer;

  mesh;
  cube;
  line;
  points: THREE.Points[];

  controls;

  constructor() {}

  ngAfterViewInit() {
    // Create scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

    // console.log(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.wrapperElement.nativeElement.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0000ff
    });

    const lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    lineGeometry.vertices.push(new THREE.Vector3(0, 1, 0));
    lineGeometry.vertices.push(new THREE.Vector3(1, 0, 0));
    lineGeometry.vertices.push(new THREE.Vector3(2, 0, 0));
    // lineGeometry.vertices.push(new THREE.Vector3( 1, 0, 0) );

    this.line = new THREE.Line(lineGeometry, lineMaterial);
    // this.scene.add(this.line);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 100;
    this.controls.maxDistance = 500;
    this.controls.maxPolarAngle = Math.PI / 2;

    // Add a point
    const dotGeometry = new THREE.Geometry();
    dotGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    dotGeometry.vertices.push(new THREE.Vector3(1, 1, 1));
    dotGeometry.vertices.push(new THREE.Vector3(1, 1, 0));
    const dotMaterial = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: false
    });

    const dot = new THREE.Points(dotGeometry, dotMaterial);
    // this.scene.add(dot);

    this.camera.position.z = 5;

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

    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }

}
